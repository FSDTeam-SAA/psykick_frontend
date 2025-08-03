/* eslint-disable */
// @ts-nocheck
"use client";

import Image from "next/image";
import { useChallengeStore } from "@/store/use-challenge-store";
import { useTMCSubmission } from "@/hooks/use-tmc-queries";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function ImageSelection() {
  const router = useRouter();
  const {
    imageChoices,
    selectedChoices,
    selectImage,
    submitChoices: storeSubmitChoices,
    targetId,
  } = useChallengeStore();

  const { mutate: submitTMC, isPending: isLoading } = useTMCSubmission();

  // Check if we can submit (both choices must be selected)
  const canSubmit = selectedChoices.firstChoice && selectedChoices.secondChoice;

  // Get image order for display
  const getImageOrder = (id: string) => {
    if (selectedChoices.firstChoice === id) return 1;
    if (selectedChoices.secondChoice === id) return 2;
    return null;
  };

  const handleSubmit = () => {
    if (!canSubmit || !targetId) return;

    // Find the selected images' URLs
    const firstChoice = imageChoices.find(
      (img) => img.id === selectedChoices.firstChoice,
    );
    const secondChoice = imageChoices.find(
      (img) => img.id === selectedChoices.secondChoice,
    );

    if (!firstChoice || !secondChoice) return;

    submitTMC(
      {
        TMCTargetId: targetId,
        firstChoiceImage: firstChoice.src,
        secondChoiceImage: secondChoice.src,
      },
      {
        onSuccess: (response) => {
          // Handle successful submission
          if (response.status) {
            storeSubmitChoices();
            router.push(`/challenges/tmc/waiting?id=${targetId}`);
          }
        },
        onError: (error: any) => {
          toast.error(
            error?.response?.data?.message ||
              "An error occurred while submitting your choices. Please try again.",
          );
          // Handle cycle complete error
          if (error?.response?.data?.cycleComplete) {
            router.push("/challenges/tmc"); // This will show the cycle complete message
            return;
          }
          // Handle other errors
          console.error("Error submitting TMC:", error);
        },
      },
    );
  };

  return (
    <div className="mt-8">
      <h3 className="text-2xl font-medium text-white mb-6">
        Select the 2 most appropriate images in order of relevance:
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {imageChoices.map((image) => {
          const order = getImageOrder(image.id);

          return (
            <div
              key={image.id}
              onClick={() => selectImage(image.id)}
              className={`relative rounded-lg overflow-hidden cursor-pointer transition-all duration-200 
                ${order ? "ring-4 ring-[#8F37FF]" : "hover:ring-2 hover:ring-[#8F37FF]"}`}
            >
              <div className="aspect-[4/3] relative">
                <Image
                  src={image.src}
                  alt="Target choice"
                  fill
                  className="object-cover"
                />
              </div>

              {order && (
                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[#8F37FF] flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  {order}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSubmit}
          disabled={!canSubmit || isLoading}
          className="px-8 py-3 bg-[#8F37FF] text-white rounded-lg hover:bg-[#7B2CE0] transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-lg font-medium"
        >
          {isLoading ? "Submitting..." : "Submit"}
        </button>
      </div>
    </div>
  );
}
