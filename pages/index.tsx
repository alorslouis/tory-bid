import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";

interface candidacy {
  candidate: string;
  // candidateThumb: string;
  support: number;
  supporters: string[];
  // support: support;
}

function candidateFormat(arr: string[]): candidacy {
  let candidate = arr[0];
  // let candidateThumb = `https://members-api.parliament.uk/api/Members/${candidate}/Thumbnail`;
  let supporters = [];
  for (let i = 1; i < arr.length; i++) {
    // little trick to drop those elements we don't want
    if (arr[i].match(/undeclared/gim)) {
    } else {
      supporters.push(arr[i]);
    }
  }
  return { candidate, support: supporters.length, supporters };
}

function formatData(arr): candidacy[] {
  let newArray = [];
  for (let i = 0; i < arr.length; i++) {
    newArray.push(candidateFormat(arr[i]));
  }
  return newArray;
}

// function to loop through the array and return a list of links
function leadershipList(arr: string) {
  const newArray = [];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i].match(/^[\w+\s\w+]/)) {
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
  const leaderData = formatData(leaderBids);

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

        {/* {leaderData[1].support[1]} */}

        {/* <ul className="grid grid-cols-2 gap-4">
          {dummyData.map((item) => (
            <li key={item.id}>
              {item.id},{item?.name}
            </li>
          ))}
        </ul> */}

        {/* old tile 
        format here */}

        {/* new tile 
        block here */}

        <div>
          <ol className="grid sm:grid-cols-2 gap-4 mx-auto my-10">
            {/* {leaderData ? leaderData?.map((item) => (
              <li key={item.candidate} className="list-none">
                test
                </li>
            ))} */}
            {console.log(leaderData)}
            {leaderData.map((item) => {
              return (
                <div className="relative flex m-4 m-auto bg-blue-400 p-4 rounded-3xl shadow-xl">
                  <li className="flex-col">
                    <Link
                      href="/profile/[name]"
                      as={`/profile/${encodeURIComponent(item.candidate)}`}
                    >
                      <h2 className="font-bold text-lg cursor-pointer py-2">
                        {item.candidate}
                      </h2>
                    </Link>
                    <hr />
                    {/* {item.candidateThumb} */}
                    {/* <p className=""> */}
                    {/* supporters:{" "} */}
                    <span
                      className={`bg-white p-4 m-6 rounded-full absolute -top-12 -right-12
                      ${
                        item.support >= 30 ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {item.support}
                    </span>
                    {/* </p> */}
                    <div className="p-4 text-center text-neutral-100">
                      {item.supporters?.map((item) => (
                        <span>
                          <Link
                            href="/profile/[name]"
                            as={`/profile/${encodeURIComponent(item)}`}
                          >
                            {item}
                          </Link>{" "}
                          {" • "}
                        </span>
                      ))}
                    </div>
                  </li>
                </div>
              );
            })}
          </ol>
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
        <a href="https://github.com/alorslouis">github</a>
      </footer>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  // Fetch data from external API
  const res = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/1ffqemZ-YOi7AvAw8HbxmMd0vIbsOXLZ7KpAmNQPD2r8/values/First Round!A2:H?majorDimension=COLUMNS&key=${process.env.NEXT_PUBLIC_GKEY}`
  );
  const data = await res.json();

  // Pass data to the page via props
  return { props: { data } };
};

export default Home;
