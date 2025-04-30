import Image from "next/image";
import { AlertTriangle } from "lucide-react";

interface ArvTarget {
  code: string;
  eventName: string;
  eventDescription: string;
  controlImage?: string;
}

export default function RevealScreen({ arvTarget }: { arvTarget: ArvTarget }) {
  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl text-white mb-6">
        Feedback for Target ID: {arvTarget.code}
      </h2>

      <div className="mb-6">
        <h3 className="text-xl text-white mb-2">Event Name</h3>
        <p className="text-yellow-300 text-lg font-medium">
          {arvTarget.eventName}
        </p>
      </div>

      <div className="mb-8">
        <p className="text-yellow-300">{arvTarget.eventDescription}</p>
      </div>

      <div className="bg-purple-900 bg-opacity-50 backdrop-blur-sm rounded-xl overflow-hidden mb-8">
        <Image
          src={arvTarget.controlImage || "/placeholder.svg"}
          alt="Control image"
          width={600}
          height={400}
          className="w-full h-auto object-cover"
        />
      </div>

      <div className="mb-8">
        <h3 className="text-xl text-white mb-4">Outcome Event</h3>
        <p className="text-yellow-300">{arvTarget.eventDescription}</p>
      </div>

      <div className="bg-red-900 bg-opacity-20 backdrop-blur-sm rounded-xl p-6 mb-8 border border-red-500">
        <div className="flex items-start gap-3">
          <AlertTriangle className="text-red-500 mt-1 flex-shrink-0" />
          <div>
            <h3 className="text-red-400 font-bold text-lg mb-2">Disclaimer:</h3>
            <div className="text-white text-sm space-y-3">
              <p>
                The <span className="font-bold">Psykick Club</span> platform and
                the{" "}
                <span className="font-bold">
                  Associative Remote Viewing (ARV) Challenge
                </span>{" "}
                are intended solely for entertainment and personal development
                purposes. The results of any ARV session do not constitute
                financial, betting, or gambling advice, and{" "}
                <span className="font-bold">
                  Psykick Club does not endorse, promote, or encourage users to
                  place wagers based on their predictions.
                </span>{" "}
                Participation in this challenge is strictly voluntary and should
                not be interpreted as a tool for financial gain or risk-taking.
              </p>
              <p>
                Psykick Club assumes no responsibility for any decisions made by
                users regarding gambling, sports betting, or other speculative
                activities based on ARV results. If you choose to engage in such
                activities, you do so{" "}
                <span className="font-bold">at your own risk</span> and
                acknowledge that Psykick Club and its affiliates bear no
                liability for any losses incurred.
              </p>
              <p>
                By participating in the ARV Challenge, you acknowledge and agree
                that this experience is{" "}
                <span className="font-bold">
                  purely experimental and recreational.
                </span>{" "}
                Always engage responsibly and within the boundaries of legal and
                ethical conduct in your jurisdiction.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
