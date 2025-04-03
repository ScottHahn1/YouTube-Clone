import { useFetchInfinite } from "@/app/hooks/useFetch";
import Replies from "./replies";
import Image from "next/image";
import { faChevronDown, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { formatNumbers } from "@/app/utils/formatter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Comments {
    id: string;
    items: {
        snippet: {
            topLevelComment: {
                id: string;
                snippet: {
                    authorDisplayName: string;
                    authorProfileImageUrl: string;
                    likeCount: number;
                    publishedAt: string;
                    textDisplay: string;
                }
            }
            totalReplyCount: number;
        }
    }[];
    nextPageToken: string;
}

const CommentThreads = ({ videoId }: { videoId: string }) => {
    const commentsQueryParams = new URLSearchParams({
        'maxResults': '30',
        'order': 'relevance',
        'part': 'id, snippet',
        'textFormat': 'plainText',
        'videoId': videoId
    }).toString();

    const { data: comments } = useFetchInfinite<Comments>(`/api/comments?${commentsQueryParams}`, ['comments', commentsQueryParams]);

    return (
        <div className='text-sm'>
            {comments?.pages.map(thread => thread.items.map(comment => (
                <div key={comment.snippet.topLevelComment.id} className='mt-7'>
                    <div className='flex gap-4'>
                        <Image 
                            className='rounded-full w-10 h-10'
                            src={comment.snippet.topLevelComment.snippet.authorProfileImageUrl}
                            width={30} height={30}
                            alt={`${comment.snippet.topLevelComment.snippet.authorDisplayName}'s profile image`} 
                        />
                        
                        <div className='flex flex-col'>
                            <p>{comment.snippet.topLevelComment.snippet.authorDisplayName}</p>
                            <p>{comment.snippet.topLevelComment.snippet.textDisplay}</p>
                            <div className='flex gap-3 items-center pt-2'>
                                <FontAwesomeIcon icon={faThumbsUp} />
                                {formatNumbers(comment.snippet.topLevelComment.snippet.likeCount)}
                            </div>
                            <div className='flex items-center gap-3 pl-1 pt-2'>
                                {
                                    comment.snippet.totalReplyCount > 0 && 
                                    <FontAwesomeIcon icon={faChevronDown} color='blue-600' />
                                }
                                <Replies parentCommentId={comment.snippet.topLevelComment.id} totalReplyCount={comment.snippet.totalReplyCount} />
                            </div>
                        </div>
                    </div>

                </div>
            )))}
        </div>
    )
}

export default CommentThreads;