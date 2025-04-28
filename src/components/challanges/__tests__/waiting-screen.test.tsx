import { render, screen } from "@testing-library/react";
import WaitingScreen from "../waiting-screen";
import { useChallengeStore } from "@/store/use-challenge-store";
import { useActiveTMCTarget } from "@/hooks/use-tmc-queries";

// Mock the hooks
jest.mock("@/store/use-challenge-store");
jest.mock("@/hooks/use-tmc-queries");
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    replace: jest.fn(),
    push: jest.fn(),
  }),
}));

describe("WaitingScreen", () => {
  const mockActiveTarget = {
    _id: "123",
    code: "TEST-123",
    revealTime: new Date(Date.now() + 3600000).toISOString(), // 1 hour from now
    targetImage: "test-image.jpg",
    controlImages: ["control1.jpg", "control2.jpg"],
  };

  beforeEach(() => {
    (useChallengeStore as jest.Mock).mockReturnValue({
      challengeCode: "TEST-123",
      targetId: "123",
      submitted: true,
      selectedChoices: {
        firstChoice: "choice1",
        secondChoice: "choice2",
      },
    });

    (useActiveTMCTarget as jest.Mock).mockReturnValue({
      data: mockActiveTarget,
      isLoading: false,
    });
  });

  it("renders congratulations message", () => {
    render(<WaitingScreen />);
    expect(screen.getByText("Congratulations!")).toBeInTheDocument();
  });

  it("displays target ID", () => {
    render(<WaitingScreen />);
    expect(screen.getByText("TEST-123")).toBeInTheDocument();
  });

  it("shows selected choices", () => {
    render(<WaitingScreen />);
    expect(screen.getByText("1st Choice: choice1")).toBeInTheDocument();
    expect(screen.getByText("2nd Choice: choice2")).toBeInTheDocument();
  });

  it("renders countdown display", () => {
    render(<WaitingScreen />);
    expect(screen.getByText("Target will be revealed in:")).toBeInTheDocument();
  });

  it("does not render when not submitted", () => {
    (useChallengeStore as jest.Mock).mockReturnValue({
      submitted: false,
      targetId: "123",
    });

    render(<WaitingScreen />);
    expect(screen.queryByText("Congratulations!")).not.toBeInTheDocument();
  });

  it("does not render without active target", () => {
    (useActiveTMCTarget as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
    });

    render(<WaitingScreen />);
    expect(screen.queryByText("Congratulations!")).not.toBeInTheDocument();
  });
});
