import { DataProvider } from "./_components/data-provider";

export default function FraudViewPage({ params }: { params: { id: string } }) {
  return <DataProvider id={params.id} />
}
