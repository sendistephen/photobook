import React, { Component, useEffect } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "react-loader-spinner";
import {
	Gallery,
	CollectionItem,
	CollectionImage,
	TotalPhotos,
} from "./SearchCollections.styles";
import { breakpointColumns } from "utils/helper";
import { Container, LoadingSpinner, Message } from "styles";
import {
	fetchCollections,
	clearCollection,
} from "../../store/search/searchActions";
import { useParams } from "react-router-dom";

const SearchCollections = (props) => {
	const { searchWord } = useParams();

	// fetch colletions on mount
	useEffect(() => {
		props.fetchCollections(searchWord);
	}, []);

	// fetch collections everytime the search word changes
	useEffect(() => {
		props.fetchCollections(searchWord);
	}, [searchWord]);

	// clear collections for previous search results on unmount
	useEffect(() => {
		props.clearCollection();
	}, [searchWord]);

	const { collections, hasMore } = props.collections;

	return (
		<Container>
			<InfiniteScroll
				dataLength={collections.length}
				next={() => props.fetchCollections(searchWord)}
				hasMore={hasMore}
				loader={
					<LoadingSpinner>
						<Loader type="ThreeDots" color="#32D3AC" />
					</LoadingSpinner>
				}
				endMessage={
					<Message>
						<b>There are no more photo collections</b>
					</Message>
				}>
				<Gallery
					breakpointCols={breakpointColumns}
					columnClassName="masonry-grid_column">
					{collections.map((collection) => (
						<Link
							key={collection.id}
							to={`/collections/${collection.id}/photos`}>
							<CollectionItem>
								<CollectionImage
									src={collection.cover_photo.urls.small}
									alt={collection.description}
								/>
								<TotalPhotos>{collection.total_photos} photos</TotalPhotos>
							</CollectionItem>
						</Link>
					))}
				</Gallery>
			</InfiniteScroll>
		</Container>
	);
};

const mapStateToProps = (state) => ({
	collections: state.search,
});
const mapDispatchToProps = {
	fetchCollections,
	clearCollection,
};
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withRouter(SearchCollections));
