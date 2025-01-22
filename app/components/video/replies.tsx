import Button from "../button";
import Image from "next/image";
import { useFetchInfinite } from "@/app/hooks/useFetch";
import { useState } from "react";
import { FaThumbsUp } from "react-icons/fa";
import { formatNumbers } from "@/app/utils/formatter";

interface Props {
    parentCommentId: string;
    totalReplyCount: number;
}

interface Replies {
    items: {
        id: string;
        snippet: {
            authorDisplayName: string;
            authorProfileImageUrl: string;
            likeCount: number;
            publishedAt: string;
            textDisplay: string;
        }
    }[];
    nextPageToken: string;
}

const Replies = ({ parentCommentId, totalReplyCount }: Props) => {
    const [fetchData, setFetchData] = useState(false);

    const repliesQueryParams = new URLSearchParams({
        'part': 'id, snippet',
        'parentId': parentCommentId,
        'maxResults': '30'
    }).toString();

    const { data: replies, fetchNextPage, hasNextPage } = useFetchInfinite<Replies>(`/api/comments/replies?${repliesQueryParams}`, ['replies', parentCommentId], fetchData);

    return (
        <div>
            <Button 
                className={'text-blue-700 cursor-pointer'}
                handleClick={() => setFetchData(true)}
            >
                {
                    totalReplyCount > 0 && (
                    <p>{totalReplyCount} replies</p>
                    )
                } 
            </Button>

            {replies?.pages.map(page =>
                page.items.map(reply => (
                    <div key={reply.id} className='flex gap-4 mt-4'>
                        <Image
                            className='rounded-full w-10 h-10'
                            src={reply.snippet.authorProfileImageUrl}
                            width={30}
                            height={30}
                            alt={`${reply.snippet.authorDisplayName}'s profile image`}
                        />
                        <div className='flex flex-col'>
                            <p>{reply.snippet.authorDisplayName}</p>
                            <p>{reply.snippet.textDisplay}</p>
                            <div className='flex gap-3 items-center'>
                                <FaThumbsUp />
                                {formatNumbers(reply.snippet.likeCount)}
                            </div>
                        </div>
                    </div>
                ))
            )}

            {hasNextPage && (
                <Button
                    className='text-blue-700 cursor-pointer'
                    handleClick={() => fetchNextPage()}
                >
                    <p>Show more replies</p>
                </Button>
            )}
        </div>
    )
}

export default Replies;