'use client';

import { Layout } from '@/components/common';
import JoinedChallenge from '@/components/mypage/JoinedChallenge';
import UserProfile from '@/components/mypage/UserProfile';

export default function Page() {
  return (
    <Layout>
      <div className="justify-evenly sm:flex-col md:flex-row lg:flex md:px-2">
        <div className="md:w-auto sm:w-full flex-shrink-0 md:px-4">
          <h3 className="mb-4">마이페이지</h3>
          <div className="p-10 bg-white drop-shadow-md">
            <UserProfile />
          </div>
        </div>
        <JoinedChallenge />
      </div>
    </Layout>
  );
}
