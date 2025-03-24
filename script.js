let data = [
        { x: 10, y: 30 },
        { x: 20, y: 60 },
        { x: 30, y: 90 },
        { x: 40, y: 120 },
      ];

      function simpleLinearRegression(data) {
        const n = data.length;
        let sumX = 0,
          sumY = 0,
          sumXY = 0,
          sumX2 = 0;

        data.forEach((point) => {
          sumX += point.x;
          sumY += point.y;
          sumXY += point.x * point.y;
          sumX2 += point.x * point.x;
        });

        const m = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
        const b = (sumY - m * sumX) / n;

        return { m, b };
      }

      function updateEquation() {
        const { m, b } = simpleLinearRegression(data);
        document.getElementById("equation").textContent = `y = ${m.toFixed(
          2
        )}x + ${b.toFixed(2)}`;
        return { m, b };
      }

      function predict(x) {
        const { m, b } = updateEquation();
        return m * x + b;
      }

      document.getElementById("updateData").addEventListener("click", () => {
        try {
          const inputData = JSON.parse(
            document.getElementById("dataInput").value
          );
          if (
            Array.isArray(inputData) &&
            inputData.every((item) => "x" in item && "y" in item)
          ) {
            data = inputData;
            updateEquation();
            document.getElementById("predictionResult").textContent =
              "Data updated. Ready for predictions!";
          } else {
            throw new Error("Invalid format");
          }
        } catch (error) {
          document.getElementById("predictionResult").textContent =
            "Invalid data format. Please use JSON format.";
        }
      });

      document.getElementById("predictButton").addEventListener("click", () => {
        const inputHours = parseFloat(
          document.getElementById("inputHours").value
        );
        if (!isNaN(inputHours)) {
          const predictedY = predict(inputHours);
          document.getElementById(
            "predictionResult"
          ).innerHTML = `For <span class="text-primary">${inputHours} hours</span>, the predicted value is <span class="text-success">${predictedY.toFixed(
            2
          )}</span>`;
        } else {
          document.getElementById("predictionResult").textContent =
            "Please enter a valid number for hours.";
        }
      });

      // Initialize equation
      updateEquation();
