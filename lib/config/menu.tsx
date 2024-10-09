import CyberThreatIntelligence from '@/components/ui/icons/CyberThreatIntelligence'
import DashboardIcon from '@/components/ui/icons/DashboardIcon'
import ICSIntelligence from '@/components/ui/icons/ICSIntelligence'
import AttackSurface from '@/components/ui/icons/AttackSurface'
import BrandProtection from '@/components/ui/icons/BrandProtection'
import SupplyChain from '@/components/ui/icons/SupplyChain'
import OnDemand from '@/components/ui/icons/OnDemand'
import Reports from '@/components/ui/icons/Reports'
import Support from '@/components/ui/icons/Support'
import Analyst from '@/components/ui/icons/Analyst'
import Settings from '@/components/ui/icons/Settings'

export interface MenuItem {
  label: string
  icon?: React.ReactNode
  href?: string
  disabled: boolean
  childItems?: Omit<MenuItem, 'childItems' | 'icon'>[]
}

export const MenuItems: MenuItem[] = [
  {
    label: 'Overview',
    icon: (
      <DashboardIcon
        width={30}
        height={30}
      />
    ),
    href: '/overview',
    disabled: false,
  },
  {
    label: 'Cyber Threat Intelligence',
    href: '/cti',
    icon: (
      <CyberThreatIntelligence
        width={30}
        height={30}
      />
    ),
    disabled: false,
    childItems: [
      {
        label: 'CTI Overview',
        href: '/cti/overview',
        disabled: false,
      },
      {
        label: 'Threat Actor Tracking',
        href: '/cti/threat_actors',
        disabled: true,
      },
      {
        label: 'Threat Hunting',
        href: '/cti/threat_hunting',
        disabled: true,
      },
      {
        label: 'Malware Intelligence',
        href: '/cti/malware_intelligence',
        disabled: true,
      },
      {
        label: 'IOC / IOA Management',
        href: '/cti/ioc',
        disabled: true,
      },
      {
        label: 'Breach Datasets',
        href: '/cti/breach',
        disabled: true,
      },
      {
        label: 'Dark Web News',
        href: '/cti/darkweb/news',
        disabled: true,
      },
      {
        label: 'Offensive Cyber Operations',
        href: '/cti/cyberattacks',
        disabled: true,
      },
      {
        label: 'Geopolitical Intelligence',
        href: '/cti/geopolitical',
        disabled: true,
      },
    ],
  },
  {
    label: 'ICS Intelligence',
    icon: (
      <ICSIntelligence
        width={30}
        height={30}
      />
    ),
    disabled: false,
    childItems: [
      {
        label: 'ICS Overview',
        href: '/ics/overview',
        disabled: true,
      },
      {
        label: 'Threat Detection',
        href: '/ics/threat_detection',
        disabled: true,
      },
      {
        label: 'Hunter Devices',
        href: '/ics/devices',
        disabled: true,
      },
      {
        label: 'OT Cyber Threats',
        href: '/ics/ot_threats',
        disabled: true,
      },
      {
        label: 'Mitre Attack',
        href: '/ics/mitre',
        disabled: false,
      },
      {
        label: 'Risk Analysis',
        href: '/ics/risk_analysis',
        disabled: true,
      },
    ],
  },
  {
    label: 'Attack Surface Management',
    icon: (
      <AttackSurface
        width={30}
        height={30}
      />
    ),
    disabled: false,
    childItems: [
      {
        label: 'Attack Surface Overview',
        href: '/asm/overview',
        disabled: true,
      },
      {
        label: 'Reconnaissance',
        disabled: true,
        href: '/asm/reconnaissance',
      },
      {
        label: 'Digital Asset Monitoring',
        href: '/asm/asset_monitor',
        disabled: true,
      },
      {
        label: 'Vulnerability Detection',
        href: '/asm/vuln',
        disabled: true,
      },
    ],
  },
  {
    label: 'Brand Protection',
    icon: (
      <BrandProtection
        width={30}
        height={30}
      />
    ),
    disabled: false,
    childItems: [
      {
        label: 'Brand Protection Overview',
        href: '/bp/overview',
        disabled: false,
      },
      {
        label: 'Fraud Protection',
        href: '/bp/fraud',
        disabled: false,
      },
      {
        label: 'VIP Protection',
        href: '/bp/vip',
        disabled: true,
      },
      {
        label: 'Takedown',
        href: '/bp/takedown',
        disabled: true,
      },
    ],
  },
  {
    label: 'Supply Chain Protection',
    icon: (
      <SupplyChain
        width={30}
        height={30}
      />
    ),
    disabled: false,
    childItems: [
      {
        label: 'SCP Overview',
        href: '/scp/overview',
        disabled: true,
      },
    ],
  },
]

export const OurServices: MenuItem[] = [
  {
    label: 'On-Demand Services',
    icon: (
      <OnDemand
        width={30}
        height={30}
      />
    ),
    disabled: false,
    childItems: [
      {
        label: 'Forensic Analysis',
        href: '/ondemand/forensic_analysis',
        disabled: true,
      },
      {
        label: 'SOC Intelligence',
        href: '/ondemand/soc',
        disabled: true,
      },
      {
        label: 'Pentest',
        href: '/ondemand/pentest',
        disabled: true,
      },
    ],
  },
  {
    label: 'Reports',
    icon: (
      <Reports
        width={30}
        height={30}
      />
    ),
    disabled: false,
    childItems: [
      {
        label: 'Bulletins',
        href: '/v1/analytics/cti',
        disabled: true,
      },
      {
        label: 'My Reports',
        href: '/v1/analytics/reports',
        disabled: true,
      },
    ],
  },
  {
    label: 'Support',
    icon: (
      <Support
        width={30}
        height={30}
      />
    ),
    disabled: false,
    childItems: [
      {
        label: 'My Tickets',
        href: '/support/my',
        disabled: true,
      },
      {
        label: 'Open Ticket',
        href: '/support/new',
        disabled: true,
      },
    ],
  },
]

export const InternalArea: MenuItem[] = [
  {
    label: 'Analyst Area',
    icon: (
      <Analyst
        width={30}
        height={30}
      />
    ),
    href: '/analyst',
    disabled: true,
  },
  {
    label: 'System Settings',
    icon: (
      <Settings
        width={30}
        height={30}
      />
    ),
    href: '/settings',
    disabled: true,
  },
]

export const mergedMenu: MenuItem[] = [
  ...MenuItems,
  ...OurServices,
  ...InternalArea,
]
