import './globals.css';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

export const metadata = {
  title: 'AgriPulse Hub',
  description: 'Agricultural news aggregation platform for modern producers, agribusiness teams, and agri innovators.'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main className="mx-auto min-h-screen max-w-7xl px-4 py-8">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
