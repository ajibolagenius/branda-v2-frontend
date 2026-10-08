import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="wrap py-24 text-center sm:py-32">
      <h1 className="display text-[clamp(3rem,8vw,6.5rem)]">Page not found.</h1>
      <p className="mt-4 text-muted">That service may have moved. Everything we offer is in the catalogue.</p>
      <Link href="/ng/services" className="btn btn-dark mt-10">Browse services</Link>
    </div>
  );
}
