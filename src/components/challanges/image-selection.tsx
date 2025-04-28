"use client";

import Image from "next/image";
import { useChallengeStore } from "@/store/use-challenge-store";
import { useTMCSubmission } from "@/hooks/use-tmc-queries";
import { useRouter } from "next/navigation";

export default function ImageSelection() {
  const router = useRouter();
  const {
    imageChoices,
    selectedChoices,
    selectImage,
    submitChoices: storeSubmitChoices,
    targetId
  } = useChallengeStore();

  const { mutate: submitTMC, isLoading } = useTMCSubmission();

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
    const firstChoice = imageChoices.find(img => img.id === selectedChoices.firstChoice);
    const secondChoice = imageChoices.find(img => img.id === selectedChoices.secondChoice);

    if (!firstChoice || !secondChoice) return;

    // Submit to API
    submitTMC({
      TMCTargetId: targetId,
      firstChoiceImage: firstChoice.src,
      secondChoiceImage: secondChoice.src
    }, {
      onSuccess: () => {
        storeSubmitChoices();
        router.push('/challenges/tmc/waiting');
      }
    });
  };

  return (
    <div className="mt-8">
      <h3 className="text-xl text-white mb-6">
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
                ${order ? "ring-4 ring-purple-600" : "hover:ring-2 hover:ring-purple-400"}`}
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
                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
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
          className="px-8 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-lg font-medium"
        >
          {isLoading ? "Submitting..." : "Submit"}
        </button>
      </div>
    </div>
  );
}
