// React 19 moves a <title> rendered anywhere into <head>, so each page names its own browser tab and history entry
export default function PageTitle({ title }: { title?: string }) {
  return <title>{title ? `${title} · 10X Shop` : "10X Shop"}</title>
}
