import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ChallengeState {
    description: string;
}

const initialState: ChallengeState = {
    description: '',
};

const challengeSlice = createSlice({
    name: 'challenge',
    initialState,
    reducers: {
        setDescription(state, action: PayloadAction<string>) {
            state.description = action.payload;
        },
    },
});

export const { setDescription } = challengeSlice.actions;
export default challengeSlice.reducer;