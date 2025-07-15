import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";

const client = generateClient<Schema>({
  authMode: 'userPool',
});

function App() {
  console.log("Available models:", Object.keys(client.models));
  // const [assets, setAsset] = useState<Array<Schema["AssetData"]["type"]>>([]);
  // useEffect(() => {
  //   client.models.AssetData.observeQuery().subscribe({
  //     next: (data) => setAsset([...data.items]),
  //   });
  // }, []);

  // async function createAsset() {
  //   // Replace these values with real data as needed
  //   await client.models.AssetData.create({
  //     assetClass: "STOCKS",
  //     assetClass1: "Equity",
  //     assetClass2: "Large Cap",
  //     category: "Tech",
  //     currency: "USD",
  //     exchangeRate: 1.0,
  //     isin: "US1234567890",
  //     paperLink: "https://example.com",
  //     name: "Example Asset",
  //     shortName: "ExAsset",
  //     ter: 0.15,
  //     createdAt: new Date().toISOString(),
  //     updatedAt: new Date().toISOString(),
  //   });
  //   alert("Asset created!");
  // }

  return (
    <main>
      <h1>My Assets</h1>
      {/* <button onClick={createAsset}>+ new Asset</button>
      <ul>
        <li>
          {assets.length === 0
            ? "No todos yet. Click the button to create one."
            : `You have ${assets.length} todos.`}
        </li>
      </ul> */}
      <div>
        🥳 App successfully hosted. Try creating a new todo.
        <br />
        <a href="https://docs.amplify.aws/react/start/quickstart/#make-frontend-updates">
          Review next step of this tutorial.
        </a>
      </div>
    </main>
  );
}

export default App;
