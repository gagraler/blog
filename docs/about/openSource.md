---
layout: page
---
<script setup>
import {
  VPTeamPage,
  VPTeamPageTitle,
  VPTeamMembers
} from 'vitepress/theme'

const members = [
  {
    avatar: 'https://avatars.githubusercontent.com/u/181114277?s=200&v=4',
    name: 'GreatSQL Operator',
    desc: 'GreatSQL Operator for MySQL based on MySQL Group Replication Cluster',
    title: 'Creator',
    links: [
      { icon: 'github', link: 'https://github.com/greatsql-sigs/greatsql-operator' },
    ]
  },

  {
    avatar: 'https://avatars.githubusercontent.com/u/209279007?s=200&v=4',
    name: 'https://github.com/infraflows/autoscale-controller',
    desc: 'Autoscale Controller 通过标准 Annotation 方式，自动管理 Kubernetes 工作负载的 HPA 与 VPA 生命周期，帮助实现智能、高效的自动扩缩容.',
    title: 'Creator',
    links: [
      { icon: 'github', link: 'https://github.com/infraflows/autoscale-controller' },
    ]
  },

  {
    avatar: 'https://avatars.githubusercontent.com/u/209279007?s=200&v=4',
    name: 'https://github.com/infraflows/loongcollector-operator',
    desc: 'LoongCollector Operator 是用于管理 LoongCollector 的 Pipeline 配置，它通过监听 Pipeline CRD 的变化，自动将配置应用到 LoongCollector Agent，并轮询Config Server中Agent的采集配置.',
    title: 'Creator',
    links: [
      { icon: 'github', link: 'https://github.com/infraflows/loongcollector-operator' },
    ]
  },

  {
    avatar: 'https://avatars.githubusercontent.com/u/205871116?s=200&v=4',
    name: 'Go Viem',
    desc: 'Go Viem is a Go library for Ethereum JSON-RPC API, inspired by Viem.',
    title: 'Creator',
    links: [
      { icon: 'github', link: 'https://github.com/AutoArbi/go-viem' },
    ]
  }
  
]
</script>

<VPTeamPage>
  <VPTeamPageTitle>
    <template #title>
      Open Source Projects ｜ 开源项目
    </template>
    <template #lead>
      The following projects were created and participated by me.
    </template>
  </VPTeamPageTitle>
  <VPTeamMembers :members />
</VPTeamPage>
