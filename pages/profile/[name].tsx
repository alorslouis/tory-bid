import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import Image from "next/image";
import Link from "next/link";

const Profile: NextPage = ({ data1, data2 }) => {
  const router = useRouter();
  const { name } = router.query;

  const member = [data1, data2];

  return (
    <>
      <div className=" m-4 bg-blue-400 rounded-xl text-zinc-200 min-h-screen">
        <div className="lg:flex-col">
          <div className="rounded-full cursor-pointer flex h-full pb-4">
            <Link href="/">
              <Image
                src={data1?.items[0].value.thumbnailUrl}
                width={300}
                height={300}
                objectFit="fill"
              />
            </Link>
            <div className="p-4">
              <p className="text-lg font-semibold">passed: {name}</p>
              <p>
                MP for{" "}
                {data1?.items[0].value.latestHouseMembership.membershipFrom},
                since{" "}
                {
                  data1?.items[0].value.latestHouseMembership
                    .membershipStartDate
                }
              </p>
            </div>
          </div>{" "}
          <hr className="bg-white" />
          <div className="flex-col m-4">
            get: {data1?.items[0].value.id},{" "}
            {data1?.items[0]?.value?.nameDisplayAs}
            get2: {data2?.value[0]?.interests[0]?.interest}
            {/* <div>get23: {for (let i = 0; i < data2.value.length; i++) {
           
        }}</div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  // Fetch data from external API
  const res1 = await fetch(
    `https://members-api.parliament.uk/api/Members/Search?Name=${context.params.name}`
  );
  const data1 = await res1?.json();

  const res2 = await fetch([
    `https://members-api.parliament.uk/api/Members/${data1?.items[0]?.value?.id}/RegisteredInterests`,
  ]);
  const data2 = await res2?.json();

  // Pass data to the page via props
  return { props: { data1, data2 } };
};

export default Profile;
