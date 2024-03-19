export interface LeetcodeData{
        totalSolved: number,
        totalQuestions: number,
        ranking: number,
        submissionCalendar: {
            timestampSubmission: TimeStampSubmission
        },
        mostRecentSubmission: {
            title: string,
            slug: string,
            timestamp: number,
            statusDisplay: string,
            lang: string,
        }
}

export interface TimeStampSubmission{
    timestamp: number,
    submissionCount: number
}