import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-black text-neutral-300 py-16">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Section - About Info */}
        <div className="space-y-4">
          <h3 className="text-2xl font-semibold text-white">Music School</h3>
          <p className="text-neutral-400">
            Elevating your musical journey with expert instructors and comprehensive courses.
          </p>
          <p className="text-sm text-neutral-500">
            Address: 123 Music Ave, Suite 456, Los Angeles, CA 90012
          </p>
          <p className="text-sm text-neutral-500">Email: contact@musicschool.com</p>
          <p className="text-sm text-neutral-500">Phone: (123) 456-7890</p>
        </div>

        {/* Middle Section - Quick Links */}
        <div className="space-y-4">
          <h4 className="text-xl font-semibold text-white">Quick Links</h4>
          <ul className="space-y-2">
            <ul className="space-y-2">
              <li>
                <Link href="/about" legacyBehavior>
                  <a className="hover:text-white transition-colors">About Us</a>
                </Link>
              </li>
              <li>
                <Link href="/courses" legacyBehavior>
                  <a className="hover:text-white transition-colors">Courses</a>
                </Link>
              </li>
              <li>
                <Link href="/instructors" legacyBehavior>
                  <a className="hover:text-white transition-colors">Instructors</a>
                </Link>
              </li>
              <li>
                <Link href="/contact" legacyBehavior>
                  <a className="hover:text-white transition-colors">Contact</a>
                </Link>
              </li>
              <li>
                <Link href="/faq" legacyBehavior>
                  <a className="hover:text-white transition-colors">FAQ</a>
                </Link>
              </li>
            </ul>

          </ul>
        </div>

        {/* Right Section - Newsletter & Socials */}
        <div className="space-y-4">
          <h4 className="text-xl font-semibold text-white">Stay Connected</h4>
          <p className="text-neutral-400">
            Sign up for our newsletter to receive updates and exclusive offers.
          </p>
          <form className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <input
              type="email"
              className="px-4 py-2 bg-neutral-700 text-white rounded focus:outline-none w-full sm:w-auto"
              placeholder="Your email address"
              required
            />
            <button className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors">
              Subscribe
            </button>
          </form>

          <div className="flex gap-4 mt-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              <i className="fab fa-facebook-f"></i>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              <i className="fab fa-twitter"></i>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Section - Copyright */}
      <div className="mt-16 border-t border-neutral-700 pt-6 text-center text-sm text-neutral-500">
        © 2024 Music School. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
