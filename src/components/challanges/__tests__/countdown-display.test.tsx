import { render, screen, act } from "@testing-library/react";
import CountdownDisplay from "../countdown-display";

describe("CountdownDisplay", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("renders countdown correctly", () => {
    const futureDate = new Date();
    futureDate.setHours(futureDate.getHours() + 1); // 1 hour in future

    render(<CountdownDisplay targetDate={futureDate} />);

    expect(screen.getByText("Hours")).toBeInTheDocument();
    expect(screen.getByText("01")).toBeInTheDocument(); // 1 hour
    expect(screen.getByText("Minutes")).toBeInTheDocument();
    expect(screen.getByText("Seconds")).toBeInTheDocument();
  });

  it("calls onComplete when countdown reaches zero", () => {
    const onComplete = jest.fn();
    const targetDate = new Date();
    targetDate.setSeconds(targetDate.getSeconds() + 2); // 2 seconds in future

    render(
      <CountdownDisplay targetDate={targetDate} onComplete={onComplete} />,
    );

    // Fast-forward time by 2 seconds
    act(() => {
      jest.advanceTimersByTime(2000);
    });

    expect(onComplete).toHaveBeenCalled();
  });

  it("updates time left every second", () => {
    const targetDate = new Date();
    targetDate.setSeconds(targetDate.getSeconds() + 5); // 5 seconds in future

    render(<CountdownDisplay targetDate={targetDate} />);

    // Initial state
    expect(screen.getByText("05")).toBeInTheDocument();

    // Advance by 1 second
    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(screen.getByText("04")).toBeInTheDocument();
  });
});
