import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
export default function BarChart({categories, totals}) {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  const data = {
    labels: categories,
    datasets: [
      {
        label: "Order Total",
        data: totals,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
        barThickness: 50
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      }
    }
  };

  return (
    <div>
        <h3>Order total per Category</h3>
        <Bar options={options} data={data} />
    </div>
  );
}