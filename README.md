# Chopper-HealthCare: AI-Powered Medical Appointment & Triage System

## 🏥 Project Overview
Chopper-HealthCare is a production-grade, multi-tenant healthcare management system designed to bridge the gap between patients and the correct medical specialists. By integrating a natural language AI triage assistant, the platform analyzes patient symptoms pre-booking to prevent misrouted appointments. The system handles the entire clinical lifecycle: AI triage, smart scheduling, secure Stripe payments, telemedicine consultations, and automated PDF prescription generation.

## 👥 Team Information (CSE4104-7D-T01)
* **Yeasir Ibna Zahir** (11230121177) - Team Leader / Architect
* **Syed Labibul Islam** (1123012183) - Backend Engineering
* **Rufida Khan Roshni** (11230121200) - Frontend Development
* **Sadia Sultana Tamanna** (11230121201) - AI & External Integrations

## ✨ Proposed Features
1. **AI Symptom Triage Engine:** Analyzes natural language symptoms and recommends the exact medical specialty required, streamlining the booking process.
2. **Comprehensive RBAC:** Four strictly isolated roles (Super Admin, Admin, Doctor, Patient) ensuring secure data access.
3. **Smart Scheduling & Booking:** Algorithmic conflict prevention, ensuring doctor availability is accurate in real-time.
4. **Integrated Payment Gateway:** Secure appointment fee processing via Stripe, utilizing webhooks for automated status updates and refunds.
5. **Telemedicine Portal:** Integrated video calling for remote consultations.
6. **Digital Medical Records:** AWS S3 integration for secure lab report uploads and the automated generation of digitally signed, watermarked PDF prescriptions.

## 💻 Technology Stack
### Frontend
* **Framework:** Next.js (React)
* **Styling:** Tailwind CSS
* **State Management:** Redux Toolkit / React Query

### Backend
* **Runtime:** Node.js (20.x LTS)
* **Framework:** Express.js
* **Language:** TypeScript (5.x)
* **Validation:** Zod

### Database & Performance
* **Primary Database:** PostgreSQL (16.x)
* **ORM:** Prisma
* **Caching Layer:** Redis

### AI & Third-Party Integrations
* **Artificial Intelligence:** OpenAI API / Google Gemini API
* **Payments:** Stripe API
* **File Storage:** AWS S3 (Cloud Storage)

## 🏗️ System Architecture
The backend is built utilizing a strict **Layered Architecture**:
* **Controllers:** Handle HTTP requests and responses.
* **Services:** Contain core business logic and AI processing.
* **Repositories/ORM:** Handle direct database transactions via Prisma.

## 🚀 Getting Started (Initial Setup)
*(Detailed installation instructions, environment variable configurations, and database seeding scripts will be added to this section as development begins in Week 3).*