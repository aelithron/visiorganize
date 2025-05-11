export default async function Page({ params }: { params: { id: string } }) {
  const id = (await params).id
  return (
    <div className="flex flex-col items-center justify-center p-6 md:p-16">
      <h1 className="text-3xl font-semibold">Project {id}</h1>
      <p>In development!</p>
    </div>
  )
}