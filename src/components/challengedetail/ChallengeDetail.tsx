import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import ChallengeHints from "./ChallengeHints";
import Modal from "./ChallengeModal";
import ChallengeSubmit from "./ChallengeSubmit";
import ChallengeTimer from "./ChallengeTimer";

import {
    ChallengeService,
} from "@/services/challenges.service";
import { FaDownload } from "react-icons/fa";


import { KEY_USERINFO } from "@/constants/storage-keys";
import { StorageUtils } from "@/utils/storage.utils";

const ChallengeDetail: React.FC = () => {
  const { id } = useParams();
  const challengeId = id ? parseInt(id, 10) : undefined;
  const [challenge, setChallenge] = useState<any>(null);
  const [hints, setHints] = useState<any[]>([]);
  const [, setUnlockHints] = useState<number[]>([]);
  const tokenString = StorageUtils.getItem(KEY_USERINFO, "local") as string;
  const token = JSON.parse(tokenString);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isChallengeStarted, setIsChallengeStarted] = useState(false);
  const [isStarting, setIsStarting] = useState(false);
  const [isStopping, setIsStopping] = useState(false);
  const [timeLimit, setTimeLimit] = useState<number | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
  const [url, setUrl] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, ] = useState("");
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Fetch challenge
  useEffect(() => {
    if (challengeId) {
      loadChallenge(challengeId);
      loadHints(challengeId);
    }
  }, [challengeId]);
  

  const loadChallenge = async (id: number) => {
    try {
      const response = await ChallengeService.getChallengeDetails(id);
      const data = response?.data;
      setChallenge(data);
      setIsSubmitted(data.solve_by_myteam);

      if (data.time_limit !== -1) {
        setTimeLimit(data.time_limit * 60);
        setTimeRemaining(response?.data?.time_remaining);
        if (response?.data.is_started && response?.data?.time_remaining > 0) {
          setIsChallengeStarted(true);
          setUrl(response?.data.challenge_url || null);
          setMessage(
            response?.data.message || "Challenge started by your teammate."
          );
        }
      } else {
        setTimeLimit(null);
        if (response?.data.is_started) {
          setIsChallengeStarted(true);
          setUrl(response?.data.challenge_url || null);
        }
      }

    } catch (err: any) {
      console.error("Error loading challenge:", err);
    }
  };

  const loadHints = async (id: number) => {
    try {
      const res = await ChallengeService.fetchhintDetails(id);
      if (res?.data.hints?.hints) setHints(res.data?.hints.hints);
    } catch (err) {
      console.error("Error loading hints:", err);
    }
  };

  useEffect(() => {
    if (isChallengeStarted && timeRemaining && timeRemaining > 0) {
      timerRef.current = setInterval(() => {
        setTimeRemaining((prev) => {
          if (!prev || prev <= 1) {
            clearInterval(timerRef.current!);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current!);
    }
    return () => clearInterval(timerRef.current!);
  }, [isChallengeStarted, timeRemaining]);

  const handleStart = async () => {
    if (!challengeId) return;
    setIsStarting(true);
    try {
      const token = localStorage.getItem("accessToken") || "";
      const response = await ChallengeService.startChallenge(
       {
        challenge_id: challengeId,
        generatedToken: token,
      }
      );
      if (response?.data?.success) {
        Swal.fire("Challenge Started!", "Check console for URL", "success");
        loadChallenge(challengeId); // refresh again
      } else {
        Swal.fire("Error!", response?.data.error || "Failed to start", "error");
      }
      
    } catch (err) {
      Swal.fire("Error!", "Something went wrong", "error");
    } finally {
      setIsStarting(false);
    }
  };

  const handleStop = async () => {
    if (!challengeId) return;
    setIsStopping(true);
    try {
      const response = await ChallengeService.stopChallenge({
        challenge_id: challengeId,
        generatedToken: token.generatedToken,
      });
      if (response?.data?.success) {
        setIsChallengeStarted(false);
        setUrl(null);
        clearInterval(timerRef.current!);
        Swal.fire("Stopped", "Challenge stopped", "success");
        
      } else {
        Swal.fire("Error", response?.data.error || "Failed to stop", "error");
      }
    } catch (err) {
      Swal.fire("Error", "Error stopping challenge", "error");
    } finally {
      setIsStopping(false);
    }
  };

  const handleDownload = async () => {
    
    try {
      ChallengeService.getFiles();
      
    } catch (err) {
      console.error("Download error", err);
    }
  };

  return (
    <div className="min-h-screen bg-theme-color-base p-4">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="lg:flex">
          {/* Challenge Left */}
          <div className="lg:w-[70%] p-8 bg-white">
            <h1 className="text-3xl font-bold text-theme-color-primary mb-6">
              {challenge?.name || "Loading..."}
            </h1>
            <div className="prose max-w-none">
              <h2 className="text-lg">
                <b>Max Attempts</b>:{" "}
                {challenge?.max_attempts > 0 ? `${challenge.max_attempts}` : "UNLIMITED"}
                <br />
                <b>Submitted</b>: {challenge?.attemps} times <br />
                <b>Type</b>: {challenge?.type}
              </h2>
              <div className="bg-neutral-low rounded-md my-4">
                <div className="bg-white rounded-md overflow-y-auto max-h-96">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: challenge?.description || "",
                    }}
                  />
                </div>
              </div>

              {/* Attached files */}
              {challenge?.files?.length > 0 && (
                <div className="flex flex-wrap gap-4">
                  {challenge.files.map((file: string, i: number) => (
                    <button
                      key={i}
                      onClick={() => handleDownload()}
                      className="flex items-center bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                    >
                      <FaDownload className="mr-2" />
                      {file}
                    </button>
                  ))}
                </div>
              )}

              {/* Challenge URL */}
              {url && (
                <pre className="bg-white my-3 p-2 border rounded">
                  {message} <br /> Your connection info: {url}
                </pre>
              )}
            </div>
          </div>

          {/* Right Panel */}
          <div className="lg:w-[30%] bg-theme-color-base p-8">
            <ChallengeTimer
              isChallengeStarted={isChallengeStarted}
              timeRemaining={timeRemaining}
              timeLimit={timeLimit}
            />

            <ChallengeHints
              hints={hints}
              onUnlocked={(id) => setUnlockHints((prev) => [...prev, id])}
            />

            <ChallengeSubmit
              challengeId={challengeId!}
              maxAttempts={challenge?.max_attempts || 0}
              attempts={challenge?.attemps || 0}
              isSubmitted={isSubmitted}
              requireDeploy={challenge?.require_deploy || false}
              isChallengeStarted={isChallengeStarted}
              onSubmitSuccess={() => {
                setIsSubmitted(true);
                setTimeRemaining(null);
              }}
            />

            {/* Start/Stop buttons */}
            {challenge?.require_deploy && !isSubmitted && (
              <>
                {!isChallengeStarted && (
                  <button
                    onClick={handleStart}
                    disabled={isStarting}
                    className={`w-full mt-4 py-3 px-6 rounded-lg font-medium transition-all ${
                      isStarting
                        ? "bg-gray-500 cursor-not-allowed"
                        : "bg-green-600 hover:bg-green-700 text-white"
                    }`}
                  >
                    {isStarting ? "Starting..." : "Start Challenge"}
                  </button>
                )}

                {isChallengeStarted && (
                  <button
                    onClick={handleStop}
                    disabled={isStopping}
                    className={`w-full mt-4 py-3 px-6 rounded-lg font-medium transition-all ${
                      isStopping
                        ? "bg-red-400 cursor-not-allowed"
                        : "bg-red-600 hover:bg-red-700 text-white"
                    }`}
                  >
                    {isStopping ? "Stopping..." : "Stop Challenge"}
                  </button>
                )}
              </>
            )}
            <Modal
              isOpen={isModalOpen}
              message={modalMessage}
              onClose={() => setIsModalOpen(false)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChallengeDetail;
