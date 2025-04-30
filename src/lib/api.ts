// API functions to fetch data from the server

export async function fetchActiveARVTarget() {
  try {
    const response = await fetch("/api/ARVTarget/get-activeARVTarget");

    if (!response.ok) {
      throw new Error(`Failed to fetch active ARV target: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching active ARV target:", error);
    throw error;
  }
}

export async function fetchARVResult(arvId: string) {
  try {
    const response = await fetch(`/api/userSubmission/get-ARVResult/${arvId}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch ARV result: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching ARV result:", error);
    throw error;
  }
}
