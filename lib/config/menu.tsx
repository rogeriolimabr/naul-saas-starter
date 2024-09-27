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
        disabled: false,
      },
      {
        label: 'Threat Hunting',
        href: '/cti/threat_hunting',
        disabled: false,
      },
      {
        label: 'Malware Intelligence',
        href: '/cti/malware_intelligence',
        disabled: false,
      },
      {
        label: 'IOC / IOA Management',
        href: '/cti/ioc',
        disabled: false,
      },
      {
        label: 'Breach Datasets',
        href: '/cti/breach',
        disabled: false,
      },
      {
        label: 'Dark Web News',
        href: '/cti/darkweb/news',
        disabled: false,
      },
      {
        label: 'Offensive Cyber Operations',
        href: '/cti/cyberattacks',
        disabled: false,
      },
      {
        label: 'Geopolitical Intelligence',
        href: '/cti/geopolitical',
        disabled: false,
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
        disabled: false,
      },
      {
        label: 'Threat Detection',
        href: '/ics/threat_detection',
        disabled: false,
      },
      {
        label: 'Hunter Devices',
        href: '/ics/devices',
        disabled: false,
      },
      {
        label: 'OT Cyber Threats',
        href: '/ics/ot_threats',
        disabled: false,
      },
      {
        label: 'Mitre Attack',
        href: '/ics/mitre',
        disabled: false,
      },
      {
        label: 'Risk Analysis',
        href: '/ics/risk_analysis',
        disabled: false,
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
        disabled: false,
      },
      {
        label: 'Reconnaissance',
        disabled: false,
        href: '/asm/reconnaissance',
      },
      {
        label: 'Digital Asset Monitoring',
        href: '/asm/asset_monitor',
        disabled: false,
      },
      {
        label: 'Vulnerability Detection',
        href: '/asm/vuln',
        disabled: false,
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
        disabled: false,
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
        disabled: false,
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
        disabled: false,
      },
      {
        label: 'Open Ticket',
        href: '/support/new',
        disabled: false,
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
    disabled: false,
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
    disabled: false,
  },
]

export const mergedMenu: MenuItem[] = [
  ...MenuItems,
  ...OurServices,
  ...InternalArea,
]
