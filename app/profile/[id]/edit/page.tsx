import { redirect } from 'next/navigation';

export default function EditPage({
  params: { id },
}: {
  params: { id: string };
}) {
  return redirect(`/profile/${id}`);
}
