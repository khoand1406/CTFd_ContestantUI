import { ChallengeHintsProps } from "@/interfaces/Challenge/ChallengeHints";
import { ChallengeService } from "@/services/challenges.service";
import Swal from "sweetalert2";

const ChallengeHints: React.FC<ChallengeHintsProps> = ({ hints, onUnlocked }) => {
  const handleUnlockHintClick = async (hintId: number, hintCost: number) => {
    try {
      const hintDetailsResponse = await ChallengeService.fetchhintDetails(hintId);
      const unlocked = !!hintDetailsResponse?.data?.content;

      if (unlocked) {
        Swal.fire({
          title: "Hint Details",
          text: `Details: ${hintDetailsResponse.data.content}`,
          icon: "info",
        });
        return;
      }

      const result = await Swal.fire({
        title: "Are you sure?",
        text: `Do you want to unlock this hint with a cost of ${hintCost} points?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, unlock it!",
        cancelButtonText: "No, cancel",
        reverseButtons: true,
      });

      if (result.isConfirmed) {
        const response = await ChallengeService.unlockHint(hintId);

        if (response) {
          const details = await ChallengeService.fetchhintDetails(hintId);
          onUnlocked(hintId);

          Swal.fire({
            title: "Hint Unlocked!",
            text: details?.data?.content || "No content available.",
            icon: "success",
          });
        } else {
          Swal.fire({
            title: "Error",
            text: "Unlock failed",
            icon: "error",
          });
        }
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Something went wrong while unlocking the hint.",
        icon: "error",
      });
    }
  };

  return (
    <div className="space-y-2 mb-4">
      {hints.length > 0 && (
        <h3 className="font-medium text-theme-color-neutral-content mb-3">
          Available Hints:
        </h3>
      )}
      <div className="grid grid-cols-3 gap-2">
        {hints.map((hint) => (
          <div key={hint.id}>
            <button
              type="button"
              className="w-full h-16 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 items-center justify-center font-medium text-theme-color-primary hover:bg-gray-5"
              onClick={() => handleUnlockHintClick(hint.id, hint.cost)}
            >
              <div className="text-center">Hint</div>
              <div className="text-center">{hint.cost} Points</div>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChallengeHints;