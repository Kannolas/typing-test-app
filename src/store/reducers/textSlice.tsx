import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import getText from '../../api/api';

import { TextType } from '../../types/types';
import { TextState } from '../../types/types';

export const fetchText = createAsyncThunk<string, string, {rejectValue:string}>(
    'textSlice/fetchText',
    async function (sentences: string, {rejectWithValue}) {
        try {
            const response = await getText(sentences);
            return response.data
        }
        catch(e){
            return rejectWithValue((e as Error).message)
        }
    }
);

const initialState:TextState = {
    text: [],
    isLoading: false,
    error: null,
    currentCharIndex: 0,
    mistakes: 0,
    pressingCount: 0
}

const textSlice = createSlice({
    name: 'textSlice',
    initialState,
    reducers:{
        setText(state, action: PayloadAction<TextType[]>){
            state.text = action.payload
        },
        setCurrentCharIndex(state, action: PayloadAction<number>) {
            state.currentCharIndex = action.payload;
        },
        setMistakes(state, action: PayloadAction<number>) {
            state.mistakes = action.payload;
        },
        increasePressingCount(state) {
            state.pressingCount = state.pressingCount + 1;
        },
        resetTextState(state) {
            state.currentCharIndex = 0;
            state.mistakes = 0;
            state.pressingCount = 0;
        },
    },
    extraReducers:(builder)=>{
        builder
            .addCase(fetchText.pending, (state)=>{
                state.isLoading = true;
                state.error = null
            })
            .addCase(fetchText.fulfilled, (state, action)=>{
                state.isLoading = false;
                state.text = action.payload.split('').map((item, index)=>{
                    return index === 0
                    ?{char: item, class: 'current-char'}
                    :{char:item, class:''};
                    
                })
            })
            .addCase(fetchText.rejected, (state, action)=>{
                state.isLoading = false;
                state.error = action.payload
            })
    }
})


export const { 
    setText, 
    setCurrentCharIndex,  
    setMistakes, 
    increasePressingCount,
    resetTextState
  } = textSlice.actions;
  
  export default textSlice.reducer;