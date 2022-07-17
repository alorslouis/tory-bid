import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Image from "next/image";
import Link from "next/link";
import Layout from "../../components/layout";

import { z } from "zod";
import useSWR from "swr";

function parseDate(date: string) {
  const forDate = new Date(Date.parse(date));
  const year = forDate.getFullYear();
  const month = forDate.getMonth();
  const day = forDate.getDate();
  // const [year, month, day] = date.split("-");
  return `${day}/${month}/${year}`;
  // return forDate.getFullYear();
}

type RootSchema = {
  data1: {
    items: Array<{
      value: {
        id: number;
        nameListAs: string;
        nameDisplayAs: string;
        nameFullTitle: string;
        nameAddressAs: string;
        latestParty: {
          id: number;
          name: string;
          abbreviation: string;
          backgroundColour: string;
          foregroundColour: string;
          isLordsMainParty: boolean;
          isLordsSpiritualParty: boolean;
          governmentType: number;
          isIndependentParty: boolean;
        };
        gender: string;
        latestHouseMembership: {
          membershipFrom: string;
          membershipFromId: number;
          house: number;
          membershipStartDate: string;
          membershipEndDate: any;
          membershipEndReason: any;
          membershipEndReasonNotes: any;
          membershipEndReasonId: any;
          membershipStatus: {
            statusIsActive: boolean;
            statusDescription: string;
            statusNotes: any;
            statusId: number;
            statusStartDate: string;
          };
        };
        thumbnailUrl: string;
      };
      links: Array<{
        rel: string;
        href: string;
        method: string;
      }>;
    }>;
    totalResults: number;
    resultContext: string;
    skip: number;
    take: number;
    links: Array<{
      rel: string;
      href: string;
      method: string;
    }>;
  };
};

export type BioSchema = {
  data2: {
    value: {
      representations: Array<{
        house: number;
        name: string;
        id: number;
        startDate: string;
        endDate: any;
        additionalInfo: string;
        additionalInfoLink: any;
      }>;
      electionsContested: Array<{
        house: number;
        name: string;
        id: number;
        startDate: string;
        endDate: any;
        additionalInfo: any;
        additionalInfoLink: any;
      }>;
      houseMemberships: Array<{
        house: number;
        name: string;
        id: number;
        startDate: string;
        endDate: any;
        additionalInfo: string;
        additionalInfoLink: any;
      }>;
      governmentPosts: Array<{
        house: number;
        name: string;
        id: number;
        startDate: string;
        endDate?: string;
        additionalInfo: string;
        additionalInfoLink: string;
      }>;
      oppositionPosts: Array<any>;
      otherPosts: Array<any>;
      partyAffiliations: Array<{
        house: number;
        name: string;
        id: number;
        startDate: string;
        endDate: any;
        additionalInfo: any;
        additionalInfoLink: any;
      }>;
      committeeMemberships: Array<{
        house: number;
        name: string;
        id: number;
        startDate: string;
        endDate: string;
        additionalInfo: any;
        additionalInfoLink: any;
      }>;
    };
    links: Array<{
      rel: string;
      href: string;
      method: string;
    }>;
  };
};

export type ContactType = {
  type: string;
  typeDescription: string | undefined;
  typeId: number;
  isPreferred: boolean;
  isWebAddress: boolean;
  notes: string | undefined;
  line1: string | undefined;
  line2: string | undefined;
  line3: string | undefined;
  line4: string | undefined;
  line5: string | undefined;
  postcode: string | undefined;
  phone: string | undefined;
  fax: string | undefined;
  email: string | undefined;
};

export interface GovernmentPost {
  house: number;
  name: string;
  id: number;
  startDate: string;
  endDate?: string;
  additionalInfo: string;
  additionalInfoLink: string;
}

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   // try {
//     const res1 = await fetch(
//       `https://members-api.parliament.uk/api/Members/Search?Name=${context?.params?.name}`
//     );
//     const data1: RootSchema = await res1?.json();
//     console.log(data1.items);

//     // const { data1 } = memberProfile(context?.params?.name);

//     // const res2 = await fetch(
//     //   `https://members-api.parliament.uk/api/Members/${data1?.items[0]?.value?.id}/Biography`
//     // );
//     // const data2 = await res2?.json();

//     // Pass data to the page via props
//     return { props: { data1 } };
//   // } catch (error) {s
//   }
// };

export const getServerSideProps: GetServerSideProps = async (context) => {
  // Fetch data from external API

  try {
    const res = await fetch(
      `https://members-api.parliament.uk/api/Members/Search?Name=${context?.params?.name}`
    );
    const data1 = (await res.json()) as RootSchema;
    // console.log(data1);

    return { props: { data1 } };
  } catch (error) {
    return {
      notFound: true,
    };
  }
  // console.log(data.items);
  // console.log(data);
  // Pass data to the page via props
};

function Profile({
  data1,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const { name } = router.query;

  const fetcher = (url: string) => fetch(url).then((r) => r.json());

  const { data, error } = useSWR(
    `https://members-api.parliament.uk/api/Members/${data1?.items[0]?.value?.id}/Biography`,
    fetcher
  );
  const { data: contact } = useSWR(
    `https://members-api.parliament.uk/api/Members/${data1?.items[0]?.value?.id}/Contact`,
    fetcher
  );

  const bioData: BioSchema = data;
  const contactData = contact;
  console.log(bioData);
  console.log(contactData);

  // const member = { data1 };
  // console.log(member);
  // const memberDate = new Date(
  //   Date.parse(data1.value.latestHouseMembership.membershipStartDate)
  // );

  if (!data1?.items[0]?.value?.id) {
    return (
      <>
        <Layout>
          <div className="container text-center">
            <div>
              <span className="font-bold italic">{name}</span> not found...
            </div>
            <Link href="/">
              <div>return home</div>
            </Link>
          </div>
        </Layout>
      </>
    );
  }

  // if (error) return <div>failed to load</div>;
  // if (!data) return <div>loading...</div>;

  {
    return (
      <>
        <Layout>
          {/* <div className="lg:flex-col">{data11.items.value}</div> */}
          {/* <div className="lg:flex-col">{name}</div>
          <div className="lg:flex-col">{data1?.items[0]?.value?.id}</div>
          <div className="lg:flex-col">
            {data1?.items[0]?.value?.nameListAs}
          </div> */}
          <div className=" m-4 bg-blue-400 rounded-xl text-zinc-200 ">
            <div className="lg:flex-col">
              <div className="rounded-full flex h-full pb-4">
                <span className="cursor-pointer">
                  <Link href="/">
                    <Image
                      src={data1.items[0].value.thumbnailUrl}
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
                    {data1.items[0].value.latestHouseMembership.membershipFrom}
                    {/* {
                    data1?.items[0].value.latestHouseMembership
                      .membershipStartDate
                  } */}
                  </p>
                  {/* Member since {memberDate.getFullYear()} */}
                  {/* <p>{data.value[0].type}</p> */}
                  {/* <p>{data2?.value.representations[0].additionalInfo}</p> */}
                  <p>{data?.value.representations[0].additionalInfo}</p>
                </div>
                {/* <div>{bioData.value.representations[0].id}</div> */}
              </div>
              <hr className="bg-white" />

              <div className="flex flex-col md:flex-row text-center justify-between p-4">
                {contact?.value.map((e: ContactType) => {
                  if (e.type === "Parliamentary" || e.type === "Constituency") {
                    return <span>{e.type}</span>;
                  } else {
                    return <a href={e.line1}>{e.type}</a>;
                  }
                })}
              </div>
              <hr className="bg-white" />

              {data?.value?.governmentPosts[0] ? (
                <div className="text-center flex-1">
                  <span className="text-lg font-extrabold">
                    government posts
                  </span>
                  <hr />
                  <table className="border-collapse flex-col table-auto w-full text-sm">
                    <thead>
                      <tr>
                        <th className="text-start">Post</th>
                        <th>From</th>
                        <th>Until </th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.value.governmentPosts.map((e: GovernmentPost) => (
                        <tr key={e.id}>
                          <td className="flex flex-auto w-3/4 py-1 text-start">
                            {e.name}
                          </td>
                          <td className="  py-1 text-center">
                            {parseDate(e.startDate)}
                          </td>
                          <td className=" py-1 text-center">
                            {e?.endDate ? parseDate(e?.endDate) : "now"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : null}
            </div>
          </div>
        </Layout>
      </>
    );
  }
}

// type profileVal = z.infer<typeof profileSchemer>;

// const memberProfile = async (paramName: string | string[] | undefined) => {
//   const data1 = await (
//     await fetch(
//       `https://members-api.parliament.uk/api/Members/Search?Name=${paramName}`
//     )
//   ).json();
//   return rootSchema.parse(data1);
// };

export default Profile;
