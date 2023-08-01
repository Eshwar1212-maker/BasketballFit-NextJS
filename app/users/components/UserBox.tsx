import Avatar from "@/app/components/Avatar";
import LoadingModal from "@/app/components/LoadingModal";
import { User } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import clsx from "clsx";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { FC } from "react";

interface UserBoxProps {
  data: User;
  input?: string
}

const UserBox: FC<UserBoxProps> = ({ data, input }) => {
  const router = useRouter();
  const {
    mutate: createConversation,
    isLoading,
    error,
  } = useMutation(
    () =>
      axios.post("/api/conversations", {
        userId: data.id,
      }),
    {
      onSuccess: async (data) => {
        router.push(`/conversations/${data.data.id}`);
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );
  const { systemTheme, theme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;
 

  return (
    <>
      {isLoading ? (
        <LoadingModal />
      ) : (
        <div
          className={clsx(
            'w-full relative flex items-center space-x-3 p-3 hover:bg-neutral-100 rounded-lg transition cursor-pointer',
            currentTheme === "dark" ? "hover:bg-neutral-800" : "hover:bg-neutral-100" 
          )}
          onClick={() => createConversation()}
        >
          <Avatar user={data} />
          <div className="min-w-0 flex-1">
            <div className="focus:outline-none">
              <div className="flex justify-between items-center mb-1">
                <p className="text-sm font-md">{data.name}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserBox;
