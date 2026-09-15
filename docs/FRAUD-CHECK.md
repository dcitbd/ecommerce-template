# Fraud Check Engine

Evaluates:
1. Customer phone number historic order records.
2. Success rate vs. return/cancellation ratio across MFS and courier logs.
3. Rating Tiers:
   - `< 50%`: Very High Risk (লাল সতর্কবার্তা)
   - `50% - 60%`: Low Risk (হলুদ সতর্কতা)
   - `60% - 70%`: No Risk (সবুজ স্বাভাবিক)
   - `70% - 80%`: Verified (নীল ভেরিফাইড)
   - `80% - 100%`: Gold Verified (স্বর্ণালী বিশ্বস্ত)
