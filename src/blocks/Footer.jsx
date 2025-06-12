export default function Footer() {
  return (
    <footer className="bg-slate-900 text-gray-200 py-12 px-6 sm:px-12">
    <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8">
      {/* Column 1 */}
      <div>
        <h2 className="text-xl font-bold text-primary mb-4">ForgeBolt</h2>
        <p className="text-sm text-text-tertiary">
          Your trusted source for premium tools and hardware. Built to perform. Priced to win.
        </p>
      </div>
  
      {/* Column 2 */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
        <ul className="space-y-2 text-sm">
          <li><a href="/" className="hover:text-primary transition">Home</a></li>
          <li><a href="/products" className="hover:text-primary transition">Products</a></li>
          <li><a href="/cart" className="hover:text-primary transition">Cart</a></li>
          <li><a href="/contact" className="hover:text-primary transition">Contact</a></li>
        </ul>
      </div>
  
      {/* Column 3 */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
        <div className="flex space-x-4">
          <a href="#" className="hover:text-primary transition">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="..." /></svg>
          </a>
          <a href="#" className="hover:text-primary transition">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="..." /></svg>
          </a>
          <a href="#" className="hover:text-primary transition">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="..." /></svg>
          </a>
        </div>
      </div>
    </div>
  
    {/* Bottom */}
    <div className="mt-10 border-t border-gray-300 dark:border-gray-600 pt-6 text-center text-sm text-text-tertiary">
      &copy; {new Date().getFullYear()} ForgeBolt Inc. All rights reserved.
    </div>
  </footer>
  
  );
}
