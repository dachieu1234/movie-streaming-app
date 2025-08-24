export default function Footer() {
  return (
    <footer className="mt-16 border-t border-neutral-800">
      <div className="container-page py-8 text-sm text-gray-400">
        © {new Date().getFullYear()} ShinTV. For demo only.
      </div>
    </footer>
  );
}
