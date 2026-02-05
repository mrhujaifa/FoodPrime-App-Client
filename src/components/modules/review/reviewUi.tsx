"use client";
import { useState } from "react";
import { Star, Send, Loader2, User, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import { reviewServices } from "@/services/review.services";

interface Props {
  mealId: string;
  customerId: string;
  initialReviews: any[];
}

export default function ReviewSection({
  mealId,
  customerId,
  initialReviews,
}: Props) {
  const [reviews, setReviews] = useState(initialReviews || []);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hover, setHover] = useState(0);

  const handleSubmit = async () => {
    if (!comment.trim()) return toast.error("Please write a comment first!");

    setIsSubmitting(true);
    const res = await reviewServices.createReview(
      rating,
      comment,
      customerId,
      mealId,
    );

    if (res.success) {
      toast.success("Review posted successfully!");
      setComment("");
      setRating(5);
      // নতুন রিভিউটি লিস্টের সবার উপরে যোগ করা
      setReviews([res.data, ...reviews]);
    } else {
      toast.error(res.message);
    }
    setIsSubmitting(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-12">
      {/* --- Review Input Card --- */}
      <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 transition-all hover:shadow-md">
        <h3 className="text-xl font-black mb-6 flex items-center gap-2">
          <MessageCircle className="text-yellow-500" /> Share Your Experience
        </h3>

        <div className="space-y-6">
          {/* Star Selection Logic */}
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(0)}
                onClick={() => setRating(star)}
                className="transition-transform active:scale-90"
              >
                <Star
                  size={32}
                  className={`transition-all ${
                    star <= (hover || rating)
                      ? "fill-yellow-400 text-yellow-400 scale-110"
                      : "text-gray-200"
                  }`}
                />
              </button>
            ))}
            <span className="ml-4 text-sm font-bold text-gray-400 uppercase tracking-widest">
              {rating} / 5
            </span>
          </div>

          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="How was the food quality and delivery service?"
            className="w-full p-5 bg-gray-50 rounded-2xl border-2 border-transparent focus:border-yellow-400 focus:bg-white outline-none transition-all min-h-[120px] font-medium"
          />

          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full md:w-auto bg-black text-white px-10 py-4 rounded-2xl font-black flex items-center justify-center gap-3 hover:bg-gray-800 disabled:bg-gray-200 transition-all shadow-lg active:scale-95"
          >
            {isSubmitting ? (
              <Loader2 className="animate-spin" />
            ) : (
              <>
                Submit Review <Send size={18} />
              </>
            )}
          </button>
        </div>
      </div>

      {/* --- Reviews Display List --- */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b pb-4">
          <h2 className="text-2xl font-black">Customer Reviews</h2>
          <span className="text-sm font-bold bg-gray-100 px-4 py-1 rounded-full text-gray-500">
            {reviews.length} Feedback
          </span>
        </div>

        {reviews.length === 0 ? (
          <div className="text-center py-10 text-gray-400">
            No reviews yet. Be the first one!
          </div>
        ) : (
          <div className="grid gap-6">
            {reviews.map((rev: any) => (
              <div
                key={rev.id}
                className="bg-white p-6 rounded-3xl border border-gray-50 shadow-sm flex gap-4"
              >
                <div className="h-12 w-12 bg-gray-100 rounded-full flex items-center justify-center shrink-0 overflow-hidden">
                  {rev.customer?.image ? (
                    <img
                      src={rev.customer.image}
                      alt="user"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User size={24} className="text-gray-300" />
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-gray-900">
                        {rev.customer?.name}
                      </h4>
                      <div className="flex gap-0.5 my-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={14}
                            className={
                              i < rev.rating
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-200"
                            }
                          />
                        ))}
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase">
                      {new Date(rev.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mt-2 leading-relaxed">
                    {rev.comment}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
