import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import Image from "next/image";
import Link from "next/link";
import Layout from "../../components/layout";

const Profile: NextPage = ({ data1, data2 }) => {
  const router = useRouter();
  const { name } = router.query;

  const member = [data1, data2];

  const memberDate = new Date(
    Date.parse(data1?.items[0].value.latestHouseMembership.membershipStartDate)
  );

  return (
    <>
      <Layout>
        <div className=" m-4 bg-blue-400 rounded-xl text-zinc-200 ">
          <div className="lg:flex-col">
            <div className="rounded-full flex h-full pb-4">
              <span className="cursor-pointer">
                <Link href="/">
                  <Image
                    src={data1?.items[0].value.thumbnailUrl}
                    width={300}
                    height={300}
                    objectFit="fill"
                  />
                </Link>
              </span>
              <div className="p-4">
                <h1 className="text-4xl font-semibold">{name}</h1>
                <p>
                  MP for{" "}
                  {data1?.items[0].value.latestHouseMembership.membershipFrom} •
                  member since{" "}
                  {/* {
                    data1?.items[0].value.latestHouseMembership
                      .membershipStartDate
                  } */}
                  {memberDate.getFullYear()}
                </p>
                <p>{data2?.value.representations[0].additionalInfo}</p>
              </div>
            </div>{" "}
            <hr className="bg-white" />
            <div className="flex-col m-4 p-4">
              get: {data1?.items[0].value.id},{" "}
              {data1?.items[0]?.value?.nameDisplayAs}
              get2: {data2?.value.representations[0].name}
              <div>
                {data2.value.representations.map((i) => (
                  <div>{i.additionalInfo}</div>
                ))}
              </div>
              {/* <div>
                <span className="text-lg">government posts: </span>
                {data2.value.governmentPosts[0]
                  ? data2.value.governmentPosts.map((e) => (
                      <div>
                        <span className="font-bold">{e.name}:</span>{" "}
                        {e.startDate} - {e?.endDate ? e?.endDate : "now"}
                      </div>
                    ))
                  : "none"}
              </div> */}
              <div className="text-center flex-1 p-4">
                <span className="text-lg font-extrabold">government posts</span>
                <hr />
                <table className="border-collapse table-auto w-full text-sm">
                  <thead>
                    <tr>
                      <th>Post</th>
                      <th>From</th>
                      <th>Until </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data2.value.governmentPosts[0]
                      ? data2.value.governmentPosts.map((e) => (
                          <tr>
                            <td className="text-start">{e.name}</td>
                            <td className="">{e.startDate}</td>
                            <td className="">
                              {e?.endDate ? e?.endDate : "now"}
                            </td>
                          </tr>
                        ))
                      : "none"}
                  </tbody>
                </table>
              </div>
              <div className="text-center p-4">
                <span className="text-lg font-extrabold">
                  committee memberships
                </span>
                <hr />
                <table className="border-collapse table-auto w-full text-sm ">
                  <thead>
                    <tr>
                      <th>Committee</th>
                      <th>From</th>
                      <th>Until </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data2.value.committeeMemberships[0]
                      ? data2.value.committeeMemberships.map((e) => (
                          <tr>
                            <td className=" text-start">{e.name}</td>
                            <td>{e.startDate}</td>
                            <td className="">
                              {e?.endDate ? e?.endDate : "now"}
                            </td>
                          </tr>
                        ))
                      : "none"}
                  </tbody>
                </table>
              </div>
              {/* representations: {console.log(data2)} */}
              {/* representations: {data2.value.representations[0].name} */}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  // Fetch data from external API
  const res1 = await fetch(
    `https://members-api.parliament.uk/api/Members/Search?Name=${context.params.name}`
  );
  const data1 = await res1?.json();

  const res2 = await fetch(
    `https://members-api.parliament.uk/api/Members/${data1?.items[0]?.value?.id}/Biography`
  );
  const data2 = await res2?.json();

  // Pass data to the page via props
  return { props: { data1, data2 } };
};

export default Profile;
