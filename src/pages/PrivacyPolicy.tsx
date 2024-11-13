import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Database, Eye, Server, Fingerprint } from 'lucide-react';

const sections = [
  {
    icon: Shield,
    title: 'Local-First Architecture',
    content: 'All your health data is stored locally on your device. We utilize browser-based storage technologies to ensure your data never leaves your control without explicit consent.',
  },
  {
    icon: Lock,
    title: 'End-to-End Encryption',
    content: 'When you choose to sync data across devices, we implement military-grade encryption. Your encryption keys are derived from your password and never transmitted to our servers.',
  },
  {
    icon: Database,
    title: 'Data Collection',
    content: 'We collect minimal data required for basic functionality: email for authentication, and anonymous usage statistics to improve the app. Health metrics, journal entries, and personal information remain exclusively on your device.',
  },
  {
    icon: Eye,
    title: 'No Third-Party Access',
    content: 'We never share, sell, or provide access to your data with third parties. Our business model is subscription-based, not data-based.',
  },
  {
    icon: Server,
    title: 'Optional Cloud Backup',
    content: 'Cloud backup is optional and encrypted. Only you can decrypt your data with your password. Even in the case of a data breach, your information remains secure and unreadable.',
  },
  {
    icon: Fingerprint,
    title: 'Your Rights',
    content: 'You have complete control over your data. Export, delete, or modify your data at any time. Request all stored information about you, and we\'ll provide it within 48 hours.',
  },
];

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-lg text-gray-600">
              Your privacy is our foundation. Learn how we protect your data.
            </p>
          </div>

          <div className="space-y-8">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-rose-100 rounded-lg">
                      <Icon className="h-6 w-6 text-rose-500" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold mb-2">{section.title}</h2>
                      <p className="text-gray-600">{section.content}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}

            <div className="text-center text-sm text-gray-500 mt-8">
              Last updated: {new Date().toLocaleDateString()}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
