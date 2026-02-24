import { MatchingDetailPage } from "@/src/views/matching-detail";

interface MatchingDetailRouteProps {
  params: Promise<{ id: string }>;
}

export default async function MatchingDetailRoute({
  params,
}: MatchingDetailRouteProps) {
  const { id } = await params;
  return <MatchingDetailPage matchingId={id} />;
}
