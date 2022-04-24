import React, { useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Loader from "react-loader-spinner";
import InfiniteScroll from "react-infinite-scroll-component";
import Modal from "components/Modal";
import { Gallery } from "./SearchPhotos.styles";
import { breakpointColumns } from "utils/helper";
import {
	Container,
	GalleryImage,
	GalleryItem,
	LoadingSpinner,
	Message,
} from "styles";
import {
	fetchPhotos,
	handleModal,
	clearPhotos,
} from "../../store/search/searchActions";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

const SearchPhotos = (props) => {
	const { searchWord } = useParams();

	useEffect(() => {
		props.fetchPhotos(searchWord);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		props.fetchPhotos(searchWord);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchWord]);

	useEffect(() => {
		props.clearPhotos();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchWord]);

	const { index, photos, hasMore } = props.photos;
	return (
		<Container>
			<InfiniteScroll
				dataLength={photos.length}
				next={() => props.fetchPhotos(searchWord)}
				hasMore={hasMore}
				loader={
					<LoadingSpinner>
						<Loader type="ThreeDots" color="#32D3AC" />
					</LoadingSpinner>
				}
				endMessage={
					<Message>
						<b>There are no more photos</b>
					</Message>
				}>
				<Gallery
					breakpointCols={breakpointColumns}
					columnClassName="masonry-grid_column">
					{photos.map((photo, index) => (
						<GalleryItem key={photo.id}>
							<GalleryImage
								src={photo.urls.small}
								alt={photo.description}
								onClick={() => props.handleModal(index)}
							/>
						</GalleryItem>
					))}
				</Gallery>
				{index > -1 && (
					<Modal
						photos={photos}
						index={index}
						hideModal={() => props.handleModal(-1)}
					/>
				)}
			</InfiniteScroll>
		</Container>
	);
};

const mapStateToProps = (state) => ({
	photos: state.search,
});
const mapDispatchToProps = {
	fetchPhotos,
	handleModal,
	clearPhotos,
};
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withRouter(SearchPhotos));
