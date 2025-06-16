import { ChallengeSubmitProps } from "@/interfaces/Challenge/ChallengeFlagSubmitProps";
import { ChallengeService } from "@/services/challenges.service";
import { useState } from "react";
import { FiCheck } from "react-icons/fi";
import Swal from "sweetalert2";

const ChallengeSubmit: React.FC<ChallengeSubmitProps> = ({
  challengeId,
  maxAttempts,
  attempts,
  isSubmitted,
  requireDeploy,
  isChallengeStarted,
  onSubmitSuccess,
}) => {
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!answer.trim()) {
      setError("Please enter your answer");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      
      const response = await ChallengeService.submitFlag(challengeId, answer);

      if (response?.data?.status === "correct") {
        Swal.fire("Correct Flag!", response.data.message, "success");
        onSubmitSuccess();
      } else if (response?.data?.status === "already_solved") {
        Swal.fire("Already Solved!", response.data.message, "info");
      } else if (response?.data?.status === "ratelimited") {
        Swal.fire("Rate Limit!", response.data.message, "warning");
      } else {
        Swal.fire("Incorrect!", response?.data?.message || "Incorrect flag", "error");
      }
    } catch (err: any) {
      Swal.fire(
        "Error!",
        err?.response?.data?.data?.message || "Error submitting flag.",
        "error"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const canSubmit =
    (!isSubmitted && (maxAttempts === 0 || attempts < maxAttempts)) &&
    (!requireDeploy || isChallengeStarted);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {maxAttempts !== 0 && attempts >= maxAttempts && !isSubmitted && (
        <div className="text-center text-red-600 font-medium">
          You have reached the maximum number of submissions allowed.
        </div>
      )}

      {canSubmit && (
        <div>
          <label htmlFor="answer" className="block mb-2 font-medium">
            Your Answer
          </label>
          <textarea
            id="answer"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className={`w-full p-3 border rounded-lg focus:ring-2 ${
              error ? "border-red-500" : "border-gray-300"
            }`}
            rows={5}
            placeholder="Enter your solution here..."
          />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
      )}

      <button
        type="submit"
        className={`w-full py-3 px-6 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2 ${
          isSubmitted
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-theme-color-primary text-white hover:bg-theme-color-primary-dark"
        }`}
        disabled={!canSubmit || isSubmitting}
      >
        {isSubmitted ? (
          <>
            <FiCheck className="text-white" />
            <span>This challenge has been solved</span>
          </>
        ) : (
          "Submit Answer"
        )}
      </button>
    </form>
  );
};

export default ChallengeSubmit;