---
layout: doc
title: Kubernetes Informer 分页实现
date: 2025-05-03 23:34:00
---
# Kubernetes Informer 分页实现

[[toc]]

在 Kubernetes 中，常常使用 `Informer` 来获取和管理资源。`Informer` 可以帮助订阅资源的变化，并对其进行增量更新。然而，在面对大量资源时，可能需要通过分页来有效地管理和处理这些资源。

## 为什么需要分页

在 Kubernetes 中，资源数量庞大时（如大量的 Pod、Deployment、Service 等），直接通过 `Informer` 获取所有资源可能会导致内存占用过高或查询超时。分页提供了一种有效的解决方案，它允许将资源分批次地获取，以便更高效地管理。

通过分页，可以每次请求获取一定数量的资源，并在后续请求中使用 `continue` token 来获取剩余的资源，直到所有资源都被加载完毕。

## Kubernetes 中的分页机制

Kubernetes 的 Go 客户端 `client-go` 使用 **`ListOptions.Continue`** 来实现分页功能。`Continue` 是一个指示下一页开始的字段，每次调用 `List` 方法时，可以通过设置 `Limit` 和 `Continue` 来控制获取的资源数量和继续的位置。

### 分页的工作原理

1. **`ListOptions` 和 `Continue`**：
   `ListOptions` 是 Kubernetes API 的一个配置对象，其中的 `Continue` 字段指示了下一页的起始位置。每次请求会返回一个 `Continue` 字段，用于在后续请求中继续获取数据。

2. **`Limit`**：
   `Limit` 参数用于限制每次请求返回的资源数量。如果你希望每次请求最多获取 `pageSize` 个资源，可以通过设置 `Limit` 来控制。

3. **获取分页数据**：
   在每次请求时，如果返回的结果还有更多资源，API 会在 `Continue` 字段中返回一个 token，指示下一页的数据。如果没有更多资源，`Continue` 字段将为空，表明分页结束。

## 如何使用 `Informer` 实现分页

虽然 Kubernetes 的 `Informer` 本身并不直接支持分页，但可以通过 `List` 方法实现分页。这涉及到通过 `ListOptions` 配置分页参数，并通过 `Continue` token 获取下一页数据。

### 分页实现步骤

1. **初始化 `Informer`**：
   通过 `client-go` 提供的 `Informer` API 订阅资源的变化，并通过 `List` 方法获取资源列表。

2. **手动分页**：
   可以控制 `ListOptions`，设置 `Limit` 和 `Continue` 参数来实现分页。每次请求后，使用返回的 `Continue` token 来继续获取后续的数据。

```go
package kube

import (
	"context"
	"fmt"
	"k8s.io/apimachinery/pkg/api/meta"
	"k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/client-go/tools/cache"
	"k8s.io/client-go/util/retry"
	"sigs.k8s.io/controller-runtime/pkg/client"
	"sigs.k8s.io/controller-runtime/pkg/controller"
)

// PaginationHelper 帮助分页获取资源
type PaginationHelper struct {
	client.Client
	Mapper          meta.RESTMapper
}

// PaginateResources 分页获取指定资源
func (p *PaginationHelper) PaginateResources(ctx context.Context, namespace, resourceType string, listObject client.ObjectList, pageSize int) ([]client.Object, error) {
	var allResources []client.Object
	var continueToken string

	// 获取资源并进行分页
	for {
		// 使用分页token来限制返回结果的数量
		listOptions := v1.ListOptions{
			Limit:  int64(pageSize),
			Continue: continueToken,
		}

		// 获取资源
		err := p.Client.List(ctx, listObject, &client.ListOptions{
			Namespace: namespace,
			ListOptions: listOptions,
		})
		if err != nil {
			return nil, fmt.Errorf("failed to list resources: %v", err)
		}

		// 将当前获取的资源添加到最终结果中
		for _, item := range listObject.(*client.ObjectList) {
			allResources = append(allResources, item)
		}

		// 获取下一页的 continue token
		if listOptions.Continue == "" {
			break
		} else {
			continueToken = listOptions.Continue
		}
	}

	return allResources, nil
}
```
### 代码解读

1. `ListOptions：`

- 在分页过程中，设置了 Limit 来指定每页的资源数量。

- Continue 用于存储下一页的开始位置，直到没有更多资源时为止。

2. `continueToken：`

- 通过循环不断获取资源列表，每次将 continueToken 作为 ListOptions.Continue 传入，直到分页结束。

3. **获取所有资源：**

- 将获取到的每一页资源添加到 allResources 列表中，直到分页结束。

## 小结
通过 Informer 配合 client-go 的分页机制，可以高效地获取 Kubernetes 集群中的大规模资源。这种方式尤其适用于需要处理大量资源的场景，比如在云平台管理、监控系统等领域中非常有用。通过适当控制分页大小和利用 Continue token，可以确保资源加载过程高效且不会消耗过多的内存。

## 参考资料
- [Kubernetes client-go](https://pkg.go.dev/k8s.io/client-go)
- [Informer 资源获取与分页](https://github.com/kubernetes/client-go/blob/master/tools/cache/shared_informer.go)

>本文作者：[许怀安](https://infraflow.co/)
><br/>创作时间：2025-05-03
><br/>版权声明：本博客所有文章除特别声明外，均采用[BY-NC-SA](https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh)许可协议。转载请禀明出处！
