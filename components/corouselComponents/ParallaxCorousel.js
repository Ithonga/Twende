import { window } from "../../constants/sizes";
import { renderItem } from "../../utils/render-items";
import * as React from "react";
import { View } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Carousel from "react-native-reanimated-carousel";
import { number } from "react-native-gesture-handler";

// Replace this with your actual data, it can be fetched from an API or a database
const defaultDataWith6Colors = [
	"#B0604D",
	"#899F9C",
	"#B3C680",
	"#5C6265",
	"#F5D399",
	"#F1F1F1",
];
 
function Index() {
	const progress = useSharedValue<number>(0);
 
	return (
		<View
			id="carousel-component"
			dataSet={{ kind: "basic-layouts", name: "parallax" }}
		>
			<Carousel
            autoPlay={true}
				autoPlayInterval={2000}
				data={defaultDataWith6Colors}
				height={258}
				loop={false}
				pagingEnabled={true}
				snapEnabled={true}
				width={window.width}
				style={{
					width: window.width,
				}}
				mode="parallax"
				modeConfig={{
					parallaxScrollingScale: 0.9,
					parallaxScrollingOffset: 50,
				}}
				onProgressChange={progress}
				renderItem={renderItem({ rounded: true })}
			/>
		</View>
	);
}
 
export default Index;
 