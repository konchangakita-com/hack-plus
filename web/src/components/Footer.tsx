export default function Footer() {
  return (
    <footer className="border-t border-gray-800 bg-gray-900 mt-12">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-sm text-gray-400 mb-2">
            Tech Insights & More
          </p>
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} Hack Plus by Konchangakita. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
