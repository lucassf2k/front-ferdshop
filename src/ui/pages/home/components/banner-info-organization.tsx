import { FaInstagram } from 'react-icons/fa6';
import { FaWhatsapp } from 'react-icons/fa6';
import { CiLocationOn } from 'react-icons/ci';
import { CiCircleInfo } from 'react-icons/ci';
import { CiStar } from 'react-icons/ci';
import logoImage from '@/ui/assets/logo.png';
import { StatusBadge } from './status-badge';
import { useGetOrganizationQuery } from '@/hooks/queries/use-get-organization-query';
import { BannerInfoOrganizationSkeleton } from '@/ui/components/skeletons/banner-info-organization-skeleton';

export const BannerInfoOrganization = () => {
  const { data: organization, isLoading } = useGetOrganizationQuery();

  if (isLoading) return <BannerInfoOrganizationSkeleton />;
  if (!organization) return null;

  return (
    <section className="-mt-28 mb-8 flex h-44 w-full min-w-85 items-center justify-between rounded-2xl bg-white p-6">
      <div className="flex items-center gap-6">
        <div className="h-30 w-30 rounded-3xl border border-blue-500 max-[780px]:hidden">
          <img
            src={logoImage}
            alt="Logo ferdshop"
            className="h-full w-full rounded-3xl"
          />
        </div>
        <div>
          <div className="flex items-center gap-6">
            <h1 className="text-[28px] font-bold uppercase">
              {organization.name}
            </h1>
            <StatusBadge status="open" />
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-1">
              <CiLocationOn className="h-5 w-5 text-amber-500" />
              <p className="text-[14px] leading-7 font-normal text-gray-500">
                {organization.address}
              </p>
            </div>
            <div className="flex items-center gap-1">
              <CiCircleInfo className="h-5 w-5 text-amber-500" />
              <p className="text-[14px] leading-7 font-normal text-gray-500">
                mais informações
              </p>
            </div>
          </div>
          <div className="mt-3">
            <div className="flex items-center gap-1">
              <CiStar />
              <CiStar />
              <CiStar />
              <CiStar /> (0)
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3 max-[780px]:flex-col max-[560px]:hidden">
        <div className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-green-200 hover:bg-green-700">
          <FaWhatsapp className="h-full w-full p-2 text-green-700 hover:text-white" />
        </div>
        <div className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-red-200 hover:bg-red-700">
          <FaInstagram className="h-full w-full p-2 text-red-700 hover:text-white" />
        </div>
      </div>
    </section>
  );
};
