import * as Font from 'expo-font';
import { DB } from './db';

export async function bootstrap() {
    try {
        await Font.loadAsync({
            'open-bold': require('../assets/fonts/OpenSans-Bold.ttf'),
            'open-regular': require('../assets/fonts/OpenSans-Regular.ttf')
        });
        
        console.log('Database success');
        
        
    } catch (error) {
        console.log(error);
        
        
    }
}