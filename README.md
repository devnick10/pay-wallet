# Pay-wallet Paytm-like App  

A scalable payment application built with **Turborepo**, featuring user and merchant services along with a dummy bank webhook.  

## 📌 Tech Stack  
- **Monorepo**: Turborepo  
- **Frontend**: Next.js, Tailwind CSS  
- **Backend**: Next.js (user-app & merchant-app), Express.js (bank-webhook)  
- **Database**: PostgreSQL with Prisma ORM  
- **State Management**: Redux  
- **Authentication**: NextAuth.js (Google provider)  
- **Server-side Language**: TypeScript  

## 📂 Project Structure  
- **`user-app/`** - User-facing application  
  - Dashboard  
  - P2P transfer via phone number  
  - Transaction history  
  - Add money to wallet (in progress)  
- **`merchant-app/`** - Merchant-facing application  
  - Authentication (Completed)  
- **`bank-webhook/`** - Dummy bank webhook  
  - Verifies payments and saves data to the database  

## 🚀 Getting Started  

### 1️⃣ Clone the Repository  
```sh
git clone https://github.com/devnick10/paytm-app.git
cd paytm-app
```

### 2️⃣ Install Dependencies  
```sh
npm install
```

### 3️⃣ Set Up Environment Variables  
Create a `.env` file in the respective services and configure database credentials, authentication, and webhook secrets.  

### 4️⃣ Run Database Migrations  
```sh
npx prisma migrate dev
```

### 5️⃣ Start the Development Server  
```sh
npm run dev
```

## 📌 Features  
✅ **User authentication** with NextAuth.js (Google provider)  
✅ **P2P money transfer** using phone number  
✅ **Transaction history tracking**  
✅ **Wallet system** for adding money (in progress)  
✅ **Merchant authentication**  
✅ **Bank webhook** for verifying payments  
✅ **State management with Redux**  

## 📱 Phone Verification Feature (Twilio)
**Branch:** `feature/verify-number`


## 🌟 Feature Highlights
- ✅ **Twilio SMS OTP Integration** in `user-app`
- 🔒 **Secure phone number verification** flow
- ⏱ **OTP expiration** (5 minutes)
- 🔄 **Resend OTP** functionality
- ➡️ **Auto-redirect** after verification
- 📱 **Mobile-responsive** UI with ShadCN


## 📌 Roadmap  
- [ ] Complete wallet top-up feature  
- [ ] Implement merchant transactions  
- [ ] Enhance security & performance  

---

### 🛠 Contributing  
Contributions are welcome! Feel free to fork this repo, make changes, and submit a pull request.  

If you like this project, give it a ⭐ on GitHub! 🚀  

