import Link from "next/link";
// import Image from "next/image"
import {
  Mail,
  Phone,
  MapPin,
  Instagram,
  Linkedin,
  Calendar,
  Guitar,
  Users,
  Mic2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Footer() {
  return (
    <footer className="text-white w-full min-h-screen flex flex-col justify-between bg-gradient-to-b from-transparent to-black/30">
      <div className="flex-grow flex flex-col lg:flex-row">
        <div className="lg:w-1/2 lg:px-12 px-5 flex flex-col justify-center items-center lg:items-start space-y-8 py-12">
          <div className="w-full max-w-lg space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center lg:text-left">
              Contact Us
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-black/30 border-none hover:bg-black/40 transition-colors">
                <CardContent className="p-6 flex items-start space-x-4">
                  <Mail className="h-6 w-6 text-red-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Email Us</h3>
                    <a
                      href="mailto:tedx@sjec.ac.in"
                      className="hover:text-red-500 transition-colors break-all text-sm"
                    >
                      tedx@sjec.ac.in
                    </a>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-black/30 border-none hover:bg-black/40 transition-colors">
                <CardContent className="p-6 flex items-start space-x-4">
                  <Phone className="h-6 w-6 text-red-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Call Us</h3>
                    <p className="text-sm mb-1">Dr. Binu KG</p>
                    <a
                      href="tel:+91-9739866947"
                      className="hover:text-red-500 transition-colors text-sm"
                    >
                      +91-9739866947
                    </a>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-black/30 border-none hover:bg-black/40 transition-colors md:col-span-2">
                <CardContent className="p-6 flex flex-col md:flex-row md:items-start md:justify-between">
                  <div className="flex items-start space-x-4 mb-4 md:mb-0">
                    <MapPin className="h-6 w-6 text-red-500 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Visit Us</h3>
                      <address className="not-italic text-sm">
                        St Joseph Engineering College,
                        <br />
                        Vamanjoor, Mangalore - 575028
                        <br />
                        Karnataka, India
                      </address>
                    </div>
                  </div>
                  <div className="flex justify-center md:justify-end space-x-4 mt-4 md:mt-0">
                    <Link
                      href="https://instagram.com/tedxsjec"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button
                        variant="outline"
                        size="icon"
                        className="rounded-full bg-red-600 hover:bg-red-700 border-none"
                      >
                        <span className="sr-only">Instagram</span>
                        <Instagram className="h-5 w-5" aria-hidden="true" />
                      </Button>
                    </Link>
                    <Link
                      href="https://www.linkedin.com/company/tedxsjec"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button
                        variant="outline"
                        size="icon"
                        className="rounded-full bg-red-600 hover:bg-red-700 border-none"
                      >
                        <span className="sr-only">LinkedIn</span>
                        <Linkedin className="h-5 w-5" aria-hidden="true" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
        <div className="lg:w-1/2 lg:px-8 px-3 flex items-center justify-center py-12">
          <div className="w-full h-[400px] md:h-[500px] lg:h-[600px] rounded-lg overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.9520361386985!2d74.89609701022555!3d12.910804316156533!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba359dfac132663%3A0xa7bf228838232d32!2sSt%20Joseph%20Engineering%20College!5e0!3m2!1sen!2sin!4v1713257369845!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="St Joseph Engineering College Map"
            ></iframe>
          </div>
        </div>
      </div>
      <div className="w-full p-4 md:p-6 bg-black/20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
          <p className="text-xs md:text-sm text-gray-400 text-center md:text-left">
            © 2024 TEDxSJEC. All Rights Reserved. This independent TEDx event
            is operated under license from TED.
          </p>
          <div className="flex space-x-4">
            <Link
              href="/privacy-policy"
              className="text-xs md:text-sm text-gray-400 hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-of-service"
              className="text-xs md:text-sm text-gray-400 hover:text-white transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
