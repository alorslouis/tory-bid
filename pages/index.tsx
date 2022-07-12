import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";

const dummyData = [{ id: 1, name: "rishi" }, { id: 2 }, { id: 3 }];

type candidate = {
  id: number;
  name: string;
};

interface candidacy {
  candidate: string;
  support: [count: number, supporters?: [supporter: string]];
}

function leadershipTile(arr: string) {
  // const newArray = [];
  for (let i = 1; i < arr.length; i++) {
    // newArray.push(arr[i] + ", ");
    return (
      <Link
        className="font-extrabold"
        href="/profile/[name]"
        as={`/profile/${encodeURIComponent(arr[i])}`}
      >
        {arr[i] + ","}
      </Link>
      // <Link
      //   href={`https://members.parliament.uk/FindYourMP?SearchText=${arr[i]}`}
      // >
      //   <p>{}</p>
      // </Link>
    );
  }
  // return newArray;
}

// function to loop through the array and return a list of links
function leadershipList(arr: string) {
  const newArray = [];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i].match(/^\w+\s\w+/)) {
      newArray.push(
        <Link
          className="font-extrabold"
          href="/profile/[name]"
          as={`/profile/${encodeURIComponent(arr[i])}`}
        >
          {arr[i] + " • "}
        </Link>
      );
    }
  }
  return (
    <div>
      supporters: {newArray.length}
      <div className="text-center">{newArray}</div>
    </div>
  );
}

const Home: NextPage = ({ data }) => {
  // const [leaderData, setLeaderData] = useState(null);
  // const [isLoading, setLoading] = useState(false);

  // useEffect(() => {
  //   setLoading(true);
  //   fetch(
  //     `https://sheets.googleapis.com/v4/spreadsheets/1ffqemZ-YOi7AvAw8HbxmMd0vIbsOXLZ7KpAmNQPD2r8/values/MP Round!A3:K?majorDimension=COLUMNS&valueRenderOption=FORMULA&key=${process.env.NEXT_PUBLIC_GKEY}`
  //     // requestOptions
  //   )
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setLeaderData(data.values);
  //       setLoading(false);
  //     });
  // }, []);

  const leaderBids = data.values;

  return (
    <div className={styles.container}>
      <Head>
        <title>toryBids</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className="text-8xl font-extrabold py-3">toryBids</h1>

        {/* <p>{dummyData[0].id}</p> */}
        {/* <ul className="grid grid-cols-2 gap-4">
          {dummyData.map((item) => (
            <li key={item.id}>
              {item.id},{item?.name}
            </li>
          ))}
        </ul> */}
        <div>
          <ul className="grid grid-cols-2 gap-4 mx-auto my-10">
            {leaderBids
              ? leaderBids?.map((item) => (
                  <li key={item} className="list-none">
                    {/* {console.log(item)} */}
                    <div className="flex  mx-4 flex-col m-auto bg-blue-400 p-4 rounded-md shadow-lg">
                      {/* <div className="relative flex flex-auto"> */}
                      {/* <Link
                          className="font-extrabold"
                          href={`https://members.parliament.uk/FindYourMP?SearchText=${item[0]}`}
                        >
                          {item[0].toUpperCase()}
                        </Link> */}
                      <Link
                        href="/profile/[name]"
                        as={`/profile/${encodeURIComponent(item[0])}`}
                      >
                        <h2 className="font-extrabold cursor-pointer">
                          {item[0]?.toUpperCase()}
                        </h2>
                      </Link>
                      {/* <p className="font-extralight px-2">
                          supporters: {item?.slice(1)?.length}
                        </p> */}
                      {/* </div> */}
                      {/* <p className="font-light">{item.slice(1)}</p> */}

                      <span className="text-gray-200 m-4">
                        {leadershipList(item)}
                      </span>
                    </div>
                  </li>
                ))
              : "loading..."}
          </ul>
        </div>

        {/* <p>{leaderBids ? leaderBids[0]?.slice(1) : "fail"}</p> */}
        {/* <p>{leaderBids ? leaderBids[0].length : "fail"}</p> */}

        {/* <p>{leaderBids[0]}</p> */}
        {/* <p>{leaderData.values[0]}</p> */}
        {/* <p>{leaderData}</p> */}
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
          {"  "}+ GuidoFawkes
        </a>
      </footer>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  // Fetch data from external API
  const res = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/1ffqemZ-YOi7AvAw8HbxmMd0vIbsOXLZ7KpAmNQPD2r8/values/First Round!A2:H?majorDimension=COLUMNS&key=${process.env.NEXT_PUBLIC_GKEY}`
  );
  const data = await res.json();

  // Pass data to the page via props
  return { props: { data } };
};

export default Home;
