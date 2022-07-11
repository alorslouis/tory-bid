import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import Image from "next/image";

const Profile: NextPage = ({ data1, data2 }) => {
  const router = useRouter();
  const { name } = router.query;

  return (
    <>
      <div className="flex-col">
        <div>passed: {name}</div>
        get: {data1?.items[0].value.id}, {data1.items[0].value.nameDisplayAs}
        get2: {data2?.value}
        <div>
          <Image
            src={data1?.items[0].value.thumbnailUrl}
            width={300}
            height={300}
          />
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
  const data1 = await res1.json();

  const res2 = await fetch(
    `https://members-api.parliament.uk/api/Members/${data1?.items[0].value.id}/thumbnailUrl`
  );
  const data2 = await res2.json();

  // Pass data to the page via props
  return { props: { data1, data2 } };
};

export default Profile;
