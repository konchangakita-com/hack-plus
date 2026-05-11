import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-gray-800 bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-white">HACK</span>
            <span className="text-2xl font-bold text-[#00FF88]">+</span>
            <span className="text-2xl font-bold text-white">PLUS</span>
          </Link>
          <nav>
            <ul className="flex space-x-6">
              <li>
                <Link
                  href="/"
                  className="text-gray-300 hover:text-[#00FF88] transition-colors"
                >
                  記事
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-300 hover:text-[#00FF88] transition-colors"
                >
                  About
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
