const supabase = require("../config/supabaseClient");

// Fetch employee scores
async function getEmployeeScores(req, res) {
  const tenantId = req.query.tenant_id;
  console.log("Fetching employee scores from Supabase for tenant:", tenantId);

  if (!tenantId) {
    return res
      .status(400)
      .json({ message: "tenant_id query parameter is required" });
  }

  try {
    const { data, error } = await supabase
      .from("user_employee_scores")
      .select("user_id, email, total_score_per, total_possible_score")
      .eq("tenant_id", tenantId);

    if (error) {
      throw error;
    }

    // Process data to round total_score_per
    const processedData = data.map((item) => ({
      user_id: item.user_id,
      email: item.email,
      total_score_per: Math.round(item.total_score_per),
      total_possible_score: item.total_possible_score,
    }));

    res.status(200).json(processedData);
  } catch (error) {
    console.error("Failed to fetch employee scores:", error.message);
    res.status(500).json({
      message: "Failed to fetch employee scores",
      error: error.message,
    });
  }
}

// Fetch and calculate average scores
async function getAverageScores(req, res) {
  const tenantId = req.query.tenant_id;

  if (!tenantId) {
    return res
      .status(400)
      .json({ message: "tenant_id query parameter is required" });
  }

  try {
    const { data, error } = await supabase
      .from("user_employee_scores")
      .select("total_score_per, total_possible_score")
      .eq("tenant_id", tenantId);

    if (error) {
      throw error;
    }

    if (data.length === 0) {
      return res.status(404).json({ message: "No employee scores found" });
    }

    const totalScores = data.reduce(
      (acc, score) => acc + score.total_score_per,
      0
    );
    const totalPossibleScores = data.reduce(
      (acc, score) => acc + score.total_possible_score,
      0
    );

    const averageScore = totalScores / data.length;
    const averagePossibleScore = totalPossibleScores / data.length;

    res.status(200).json({ averageScore, averagePossibleScore });
  } catch (error) {
    console.error(
      "Failed to fetch and calculate average scores:",
      error.message
    );
    res.status(500).json({
      message: "Failed to fetch and calculate average scores",
      error: error.message,
    });
  }
}

module.exports = {
  getEmployeeScores,
  getAverageScores,
};
